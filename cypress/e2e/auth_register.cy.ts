describe("Registro (integración UI + API)", () => {
  const api = () => Cypress.env("backendUrl");

  it("registra correctamente y redirige a /login", () => {
    // Ajusta a la ruta real que usa registerUser
    cy.intercept("POST", "/auth/register/", {
      statusCode: 201,
      body: { id: 123, email: "ana@example.com", name: "Ana", role: "user" },
    }).as("register");


    cy.visit("/register");

    cy.get("#email").type("ana@example.com");
    cy.get("#nombre").type("Ana");
    cy.get("#password").type("SuperSecreta123");
    cy.get("#confirm-password").type("SuperSecreta123");
    cy.contains("button", /registrarse/i).click();

    cy.wait("@register");
    cy.url().should("include", "/login");
  });

  it("muestra error del backend si el registro falla", () => {
    cy.intercept("POST", "/auth/register/", {
      statusCode: 400,
      body: { message: "El correo ya está registrado" },
    }).as("registerFail");

    cy.visit("/register");

    cy.get("#email").type("ana@example.com");
    cy.get("#nombre").type("Ana");
    cy.get("#password").type("SuperSecreta123");
    cy.get("#confirm-password").type("SuperSecreta123");
    cy.contains("button", /registrarse/i).click();

    cy.wait("@registerFail");
    cy.contains(".text-red-500", /Error en el registro/i).should("exist");
    cy.url().should("include", "/register");
  });
});