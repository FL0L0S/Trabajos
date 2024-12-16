const request = require('supertest')
const app = require("../index");
const bandaAlta = {

    Nombre: "NuevaBanda",
    IdVocalista: 1,
    FechaCreacion: "1987-01-10"

};
const bandaModificacion = {
    Nombre: "BandaModificada",
    IdVocalista: 3,
    FechaCreacion: "1976-01-10"

};

// test route/album GET
describe("GET /bandas", () => {
  it("Deberia devolver todos las bandas paginadas", async () => {
    const res = await request(app).get("/bandas");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdBanda: expect.any(Number),
            Nombre: expect.any(String),
            FechaCreacion: expect.any(String),
            IdVocalista: expect.any(Number)
          }),
        ]),
      )
});
  });
;



// test route/bandas/:id GET
describe("GET /bandas/:id", () => {
  it("Deberia devolver la banda con el id 1", async () => {
    const res = await request(app).get("/bandas/1");
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdBanda: expect.any(Number),
        Nombre: expect.any(String),
        FechaCreacion: expect.any(String),
        IdVocalista: expect.any(Number)
      })
    );
  });
});

// test route/bandas POST
describe("POST /bandas", () => {
  it("Deberia devolver la banda que acabo de crear", async () => {
    const res = await request(app).post("/bandas").send(bandaAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nombre: expect.any(String),
        FechaCreacion: expect.any(String),
        IdVocalista: expect.any(Number)
      })
    );
  });
});

// test route/bandas/:id PUT
describe("PUT /bandas/:id", () => {
  it("Deberia devolver la banda con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/bandas/1")
      .send(bandaModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/bandas/:id DELETE
describe("DELETE /bandas/:id", () => {
  it("Debería devolver la banda con el id 11 borrado", async () => {
    const res = await request(app).delete("/bandas/11");
    expect(res.statusCode).toEqual(200);

  
  });
});
