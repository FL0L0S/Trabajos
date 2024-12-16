const request = require('supertest')
const app = require("../index");
const recitalAlta = {
    Lugar: "NuevoRecital", 
    Fecha: "1990-01-10",
    IdTour: 1
};
const recitalModificacion = { 
    Lugar: "RecitalModificado", 
    Fecha: "2002-01-10",
    IdTour: 2
};

// test route /recitales GET
describe("GET /recitales", () => {
  it("Deberia devolver todos los recitales paginados", async () => {
    const res = await request(app).get("/recitales");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdRecital: expect.any(Number),
            Lugar: expect.any(String), 
            Fecha: expect.any(String),
            IdTour: expect.any(Number)
          }),
        ]),
      )
});
  });
;


// test route/recitales/:id GET
describe("GET /recitales/:id", () => {
  it("Deberia devolver el recital con el id 1", async () => {
    const res = await request(app).get("/recitales/1");
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdRecital: expect.any(Number),
        Lugar: expect.any(String), 
        Fecha: expect.any(String),
        IdTour: expect.any(Number)
      })
    );
  });
});

// test route/recitales POST
describe("POST /recitales", () => {
  it("Deberia devolver el recital que acabo de crear", async () => {
    const res = await request(app).post("/recitales").send(recitalAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        Lugar: expect.any(String), 
        Fecha: expect.any(String),
        IdTour: expect.any(Number)
      })
    );
  });
});

// test route/recitales/:id PUT
describe("PUT /recitales/:id", () => {
  it("Deberia devolver el recital con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/recitales/1")
      .send(recitalModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/recitales/:id DELETE
describe("DELETE /recitales/:id", () => {
  it("Debería devolver el recital con el id 11 borrado", async () => {
    const res = await request(app).delete("/recitales/11");
    expect(res.statusCode).toEqual(200);

  
  });
});
