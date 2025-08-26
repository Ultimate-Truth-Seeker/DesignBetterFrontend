// cypress/e2e/_net_tap_fetch.cy.ts
describe("Tap de red con fetch stub", () => {
  it("intercepta cualquier fetch desde la página de login", () => {
    cy.visit("/login", {
      onBeforeLoad(win) {
        // Guarda el fetch real por si lo necesitas
        const realFetch = win.fetch;

        cy.stub(win, "fetch")
          .callsFake((input: RequestInfo | URL, init?: RequestInit) => {
            const url = String(input);
            const method = init?.method || "GET";
            // Log visible en el runner (y en el contenedor si corres en docker)
            // Útil para ver exactamente a qué URL y método está llamando
            // y el body que envía.
            // eslint-disable-next-line no-console
            console.log("FETCH >>", method, url, init?.body);

            // Si es el login, respondemos nosotros (fake 200)
            if (/\/auth\/|\/api\/auth\/|\/login|\/jwt\/create/.test(url) && method === "POST") {
              const body = JSON.stringify({
                access: "fake_access_token",
                refresh: "fake_refresh_token",
                user: { id: 1, name: "Ana" },
              });
              return Promise.resolve(
                new win.Response(body, {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                })
              );
            }

            // Para lo demás, deja pasar al fetch real
            return realFetch(input as any, init);
          })
          .as("fetchStub");
      },
    });

    cy.get("#email").type("ana@example.com");
    cy.get("#password").type("SuperSecreta123");
    cy.get("form").submit();

    // Asegura que el stub se llamó al menos una vez
    cy.get("@fetchStub").should("have.been.called");
    // Y que la app avanzó (ajusta al comportamiento real)
    cy.url().should("include", "/dashboard");
  });
});
describe("Login (integración UI + API)", () => {
  it("loguea con credenciales válidas y redirige al dashboard", () => {
    const api = Cypress.env("backendUrl");

    // Ajusta la ruta al endpoint real que usa loginUser internamente:
    // aquí asumo /api/auth/login/
    cy.intercept("POST", "/auth/login", { statusCode: 200, body: { access: "...", refresh: "..." } }).as("login");

    cy.visit("/login");

    cy.get("#email").type("ana@example.com");
    cy.get("#password").type("SuperSecreta123");
    cy.contains("button", /iniciar sesión/i).click();

    cy.wait("@login");

    // Variante A (si tu app redirige al dashboard):
    cy.url().should("include", "/dashboard");

    // Variante B (si no hay redirect inmediato desde el form):
    // cy.window().then((win) => {
    //   // Ajusta las llaves si saveTokens usa otras
    //   expect(win.localStorage.getItem("access")).to.exist;
    //   expect(win.localStorage.getItem("refresh")).to.exist;
    // });

    // Asegura que no se muestre error
    cy.contains(".text-red-500", /error/i).should("not.exist");
  });

  it("muestra error de backend con credenciales inválidas", () => {
    const api = Cypress.env("backendUrl");

    cy.intercept("POST", "/auth/login", { statusCode: 401, body: { message: "Credenciales inválidas" }, }).as("loginFail");


    cy.visit("/login");
    cy.get("#email").type("ana@example.com");
    cy.get("#password").type("malaClave");
    cy.contains("button", /iniciar sesión/i).click();

    cy.wait("@loginFail");
    cy.contains(".text-red-500", /Error al iniciar sesión/i).should("exist");
    cy.url().should("include", "/login");
  });
});