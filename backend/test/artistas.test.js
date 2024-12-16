const request = require('supertest')
const app = require("../index");
const artistaAlta = {
  Nombre: "LoloSanchez",
  FechaNacimiento: "1988-01-10",
  Mail: "2francisco@gmail.com"
};
const artistaModificacion = {
  Nombre: "Javier",
  FechaNacimiento: "2002-09-13",
  Mail: "javier@gmail.com"
};

// test route/artistas GET
describe("GET /artistas", () => {
  it("Deberia devolver todos los albums paginados", async () => {
    const res = await request(app).get("/artistas");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdArtista: expect.any(Number),
            Nombre: expect.any(String),
            FechaNacimiento: expect.any(String),
            Mail:expect.any(String)
          }),
        ]),
      )
});
  });
;



// test route/artistas/:id GET
describe("GET /artistas/:id", () => {
  it("Deberia devolver el artista con el id 1", async () => {
    const res = await request(app).get("/artistas/1");
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nombre: expect.any(String),
        FechaNacimiento: expect.any(String),
        Mail:expect.any(String)
      })
    );
  });
});

// test route/album POST
describe("POST /artistas", () => {
  it("Deberia devolver el artista que acabo de crear", async () => {
    const res = await request(app).post("/artistas").send(artistaAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nombre: expect.any(String),
        FechaNacimiento: expect.any(String),
        Mail:expect.any(String)
        
      })
    );
  });
});

// test route/artistas/:id PUT
describe("PUT /artistas/:id", () => {
  it("Deberia devolver el artista con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/artistas/1")
      .send(artistaModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/artistas/:id DELETE
describe("DELETE /artistas/:id", () => {
  it("Debería devolver el artista con el id 1 borrado", async () => {
    const res = await request(app).delete("/artistas/11");
    expect(res.statusCode).toEqual(200);

  
  });
});
