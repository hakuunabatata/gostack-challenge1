const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => response.json(repositories));

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const likes = 0;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  console.log(repoIndex);

  if (repoIndex < 0) {
    return response.status(400).json({
      error: `Not FOUND PROJECT WITH ID ${id}`,
    });
  }

  const { likes } = repositories[repoIndex];

  repositories[repoIndex] = {
    id,
    ...request.body,
    likes,
  };

  console.log(repositories[repoIndex]);

  return response.json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  console.log(repoIndex);

  if (repoIndex < 0) {
    return response.status(400).json({
      error: `Not FOUND PROJECT WITH ID ${id}`,
    });
  }

  repositories.splice(repoIndex, 1);

  return response.send(204);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  console.log(repoIndex);

  if (repoIndex < 0) {
    return response.status(400).json({
      error: `Not FOUND PROJECT WITH ID ${id}`,
    });
  }

  const { likes } = repositories[repoIndex];

  repositories[repoIndex].likes = likes + 1;

  return response.json({ likes: likes + 1 });
});

module.exports = app;
