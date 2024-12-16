const request = require('supertest')
const app = require("../index");
const tourAlta = {
    Nombre: "TourNuevo", 
    FechaInicio:"2024-05-10", 
    FechaFin: "2024-11-10", 
    IdBanda: 1
};
const tourModificacion = {
    Nombre: "TourModificada", 
    FechaInicio:"1999-05-10", 
    FechaFin: "2000-11-10", 
    IdBanda: 1
};

// test route/tour GET
describe("GET /tours", () => {
  it("Deberia devolver todos los tours paginados", async () => {
    const res = await request(app).get("/tours");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            FechaInicio: expect.any(String),
            FechaFin: expect.any(String),
            IdTour: expect.any(Number),
            IdBanda: expect.any(Number),
            Nombre: expect.any(String),
          }),
        ]),
      )
});
  });
;



// test route/tours/:id GET
describe("GET /tours/:id", () => {
  it("Deberia devolver el tour con el id 1", async () => {
    const res = await request(app).get("/tours/1");
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        FechaInicio: expect.any(String),
        FechaFin: expect.any(String),
        IdTour: expect.any(Number),
        IdBanda: expect.any(Number),
        Nombre: expect.any(String),
      })
    );
  });
});

// test route/tours POST
describe("POST /tours", () => {
  it("Deberia devolver el tour que acabo de crear", async () => {
    const res = await request(app).post("/tours").send(tourAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        FechaInicio: expect.any(String),
        FechaFin: expect.any(String),
        IdBanda: expect.any(Number),
        Nombre: expect.any(String),
      })
    );
  });
});

// test route/tour/:id PUT
describe("PUT /tours/:id", () => {
  it("Deberia devolver el tour con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/tours/1")
      .send(tourModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/tour/:id DELETE
describe("DELETE /tours/:id", () => {
  it("Debería devolver el tour con el id 1 borrado", async () => {
    const res = await request(app).delete("/tours/11");
    expect(res.statusCode).toEqual(200);

  
  });
});
