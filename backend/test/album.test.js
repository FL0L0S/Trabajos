const request = require('supertest')
const app = require("../index");
const albumAlta = {
  Nombre: "Nuevoalbum",
  FechaLanzamiento: "1988-01-10",
  IdBanda: 1, 
  IdDiscografica: 1
};
const albumModificacion = {
    Nombre: "After Chabon",
    FechaLanzamiento: "1987-01-10",
    IdBanda: 3, 
    IdDiscografica: 3
};

// test route/album GET
describe("GET /album", () => {
  it("Deberia devolver todos los albums paginados", async () => {
    const res = await request(app).get("/albums");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            FechaLanzamiento: expect.any(String),
            IdAlbum: expect.any(Number),
            IdBanda: expect.any(Number),
            IdDiscografica: expect.any(Number),
            Nombre: expect.any(String)
          }),
        ]),
      )
});
  });
;



// test route/album/:id GET
describe("GET /albums/:id", () => {
  it("Deberia devolver el album con el id 1", async () => {
    const res = await request(app).get("/albums/1");
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdAlbum: expect.any(Number),
        Nombre: expect.any(String),
        FechaLanzamiento: expect.any(String),
        IdBanda: expect.any(Number),
        IdDiscografica: expect.any(Number)
      })
    );
  });
});

// test route/album POST
describe("POST /albums", () => {
  it("Deberia devolver el album que acabo de crear", async () => {
    const res = await request(app).post("/albums").send(albumAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nombre: expect.any(String),
        FechaLanzamiento: expect.any(String),
        IdBanda: expect.any(Number),
        IdDiscografica: expect.any(Number),
      })
    );
  });
});

// test route/album/:id PUT
describe("PUT /albums/:id", () => {
  it("Deberia devolver el album con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/albums/1")
      .send(albumModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/album/:id DELETE
describe("DELETE /albums/:id", () => {
  it("Debería devolver el album con el id 11 borrado", async () => {
    const res = await request(app).delete("/albums/11");
    expect(res.statusCode).toEqual(200);

  
  });
});
