const request = require('supertest')
const app = require("../index");
const discograficaAlta = {
    Nombre: "NuevaDiscograficada",
    FechaUnion: "1990-01-10"
};
const discograficaModificacion = {
    Nombre: "DiscograficaModificada",
    FechaUnion: "1990-01-10"
}

// test route /discograficas GET
describe("GET /discograficas", () => {
  it("Deberia devolver todos las discograficas paginadas", async () => {
    const res = await request(app).get("/discograficas");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdDiscografica: expect.any(Number),
            Nombre: expect.any(String),
            FechaUnion: expect.any(String)
          }),
        ]),
      )
});
  });
;


// test route/discograficas/:id GET
describe("GET /discograficas/:id", () => {
  it("Deberia devolver la discograficas con el id 4", async () => {
    const res = await request(app).get("/discograficas/4");
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdDiscografica: expect.any(Number),
        Nombre: expect.any(String),
        FechaUnion: expect.any(String)
      })
    );
  });
});

// test route/canciones POST
describe("POST /discograficas", () => {
  it("Deberia devolver la discografica que acabo de crear", async () => {
    const res = await request(app).post("/discograficas").send(discograficaAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nombre: expect.any(String),
        FechaUnion: expect.any(String)
      })
    );
  });
});

// test route/discograficas/:id PUT
describe("PUT /discograficas/:id", () => {
  it("Deberia devolver la discografica con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/discograficas/1")
      .send(discograficaModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/discograficas/:id DELETE
describe("DELETE /discograficas/:id", () => {
  it("Debería devolver la discografica con el id 11 borrado", async () => {
    const res = await request(app).delete("/discograficas/11");
    expect(res.statusCode).toEqual(200);

  
  });
});
