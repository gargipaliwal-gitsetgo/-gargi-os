const projects = [
  {
    number: "01",
    title: "QUICK BITE",
    type: "PYTHON / CONSOLE PROJECT",
    description:
      "A little restaurant ordering system with menus, orders and a reward-point system.",
    tags: ["Python", "Console", "Logic"],
  },

  {
    number: "02",
    title: "AI WASTE DETECTION",
    type: "AI / COMPUTER VISION",
    description:
      "A project exploring how AI can help identify and classify different types of waste.",
    tags: ["AI", "Computer Vision", "ML"],
  },

  {
    number: "03",
    title: "FILM SOCIETY",
    type: "DESIGN / VISUALS",
    description:
      "Digital posters and visual content created for college events and film society.",
    tags: ["Design", "Posters", "Visuals"],
  },

  {
    number: "04",
    title: "CONTENT",
    type: "REELS / POSTS / YOUTUBE",
    description:
      "Random ideas turned into reels, posts and videos because apparently I need to document everything.",
    tags: ["Content", "Editing", "Storytelling"],
  },
];

function Projects() {
  return (
    <section id="projects" className="projects">

      <div className="projects-header">
        <span>02 / THINGS I MAKE</span>
        <span>A LITTLE ARCHIVE</span>
      </div>

      <div className="projects-intro">
        <p>things i've built,</p>
        <p>designed,</p>
        <p>edited,</p>
        <p>drawn,</p>
        <p>and somehow convinced myself</p>
        <p>were a good idea.</p>
      </div>

      <div className="project-list">

        {projects.map((project) => (
          <article
            className="project-card"
            key={project.number}
          >

            <div className="project-number">
              {project.number}
            </div>

            <div className="project-info">

              <p className="project-type">
                {project.type}
              </p>

              <h3>
                {project.title}
              </h3>

              <p className="project-description">
                {project.description}
              </p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

            </div>

            <div className="project-arrow">
              ↗
            </div>

          </article>
        ))}

      </div>

      <p className="projects-footer">
        still making things.
      </p>

    </section>
  );
}

export default Projects;