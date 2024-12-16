const request = require('supertest')
const app = require("../index");
const cancionAlta = {
    Nombre: "NuevaCancion",
    FechaLanzamiento: "1987-01-10",
    IdAlbum: 1
};
const cancionModificacion = {
    Nombre: "CancionModificada",
    FechaLanzamiento: "1987-01-10",
    IdAlbum: 1
};

// test route/canciones GET
describe("GET /canciones", () => {
  it("Deberia devolver todos las canciones paginadas", async () => {
    const res = await request(app).get("/canciones");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdCancion: expect.any(Number),
            Nombre: expect.any(String),
            FechaLanzamiento: expect.any(String),
            IdAlbum: expect.any(Number)
          }),
        ]),
      )
});
  });
;



// test route/canciones/:id GET
describe("GET /canciones/:id", () => {
  it("Deberia devolver la cancion con el id 1", async () => {
    const res = await request(app).get("/canciones/1");
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
    
        IdCancion: expect.any(Number),
        Nombre: expect.any(String),
        FechaLanzamiento: expect.any(String),
        IdAlbum: expect.any(Number)
      })
    );
  });
});

// test route/canciones POST
describe("POST /canciones", () => {
  it("Deberia devolver la cancion que acabo de crear", async () => {
    const res = await request(app).post("/canciones").send(cancionAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nombre: expect.any(String),
        FechaLanzamiento: expect.any(String),
        IdAlbum: expect.any(Number)
      })
    );
  });
});

// test route/canciones/:id PUT
describe("PUT /canciones/:id", () => {
  it("Deberia devolver la cancion con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/canciones/11")
      .send(cancionModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/canciones/:id DELETE
describe("DELETE /canciones/:id", () => {
  it("Debería devolver la cancion con el id 11 borrado", async () => {
    const res = await request(app).delete("/canciones/11");
    expect(res.statusCode).toEqual(200);

  
  });
});
