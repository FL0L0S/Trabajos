const request = require('supertest')
const app = require("../index");
const videoClipAlta = { 
    Titulo: "VideoNuevo", 
    Link:"https://www.youtube.com/watch?v=VZzSasd", 
    FechaLanzamiento: "2024-11-10",
    IdCancion: 1
};
const videoClipModificacion = {
    Titulo: "VideoModificadp", 
    Link:"https://www.youtube.com/watch?v=VZzSBv6tXasd", 
    FechaLanzamiento: "2024-11-10",
    IdCancion: 1
};

// test route/videos GET
describe("GET /videos", () => {
  it("Deberia devolver todos los videos paginados", async () => {
    const res = await request(app).get("/videos");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdVideoClip: expect.any(Number), 
            Titulo: expect.any(String), 
            Link: expect.any(String), 
            FechaLanzamiento: expect.any(String),
            IdCancion: expect.any(Number)
          }),
        ]),
      )
});
  });
;



// test route/videos/:id GET
describe("GET /videos/:id", () => {
  it("Deberia devolver el video con el id 1", async () => {
    const res = await request(app).get("/videos/1");
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdVideoClip: expect.any(Number), 
        Titulo: expect.any(String), 
        Link: expect.any(String), 
        FechaLanzamiento: expect.any(String),
        IdCancion: expect.any(Number)
    }),
    );
  });
});

// test route/videos POST
describe("POST /videos", () => {
  it("Deberia devolver el video que acabo de crear", async () => {
    const res = await request(app).post("/videos").send(videoClipAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        Titulo: expect.any(String), 
        Link: expect.any(String), 
        FechaLanzamiento: expect.any(String),
        IdCancion: expect.any(Number)
      })
    );
  });
});

// test route/videos/:id PUT
describe("PUT /videos/:id", () => {
  it("Deberia devolver el video con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/videos/1")
      .send(videoClipModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/tour/:id DELETE
describe("DELETE /videos/:id", () => {
  it("Debería devolver el video con el id 11 borrado", async () => {
    const res = await request(app).delete("/videos/11");
    expect(res.statusCode).toEqual(200);

  
  });
});
