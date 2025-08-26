describe("Recuperar contraseña", () => {
  it("envía el email y muestra mensaje de éxito", () => {
    
    cy.intercept("POST", "/auth/password-reset/", { statusCode: 200, body: { ok: true } }).as("resetOk");

    cy.visit("/forgot-password");
    cy.get("#email").type("ana@example.com");
    cy.contains("button", /reset password/i).click();

    cy.wait("@resetOk");
    cy.contains(/recibirás un enlace/i).should("exist");
    cy.contains(/enviando/i).should("not.exist");
  });

  it("muestra error si el backend responde fallo", () => {
    cy.intercept("POST", "/auth/password-reset/", {
      statusCode: 400,
      body: { detail: "Error genérico" },
    }).as("resetFail");

    cy.visit("/forgot-password");
    cy.get("#email").type("ana@example.com");
    cy.contains("button", /reset password/i).click();

    cy.wait("@resetFail");
    cy.contains(".text-red-600", /ocurrió un error/i).should("exist");
  });
});