# varshakalubowila.github.io

Personal research portfolio. Jekyll site, built by GitHub Pages ("Signal Lab" design).

## Editing content

You rarely need to touch HTML. Content lives in data files:

| What | File |
|---|---|
| Name, tagline, location, email, LinkedIn, GitHub, ORCID, CV link | `_config.yml` |
| Intro, research interests, key facts, monitor labels | `_data/profile.yml` |
| Experience timeline | `_data/experience.yml` |
| Featured project, project cards, "More projects" | `_data/projects.yml` |
| Skills grid | `_data/skills.yml` |
| Degrees, certificates | `_data/education.yml` |
| Sense of Agency case study | `projects/sense-of-agency.html` |

- Leave `orcid` or `cv_pdf` as `""` in `_config.yml` to hide them. To add a CV, put the PDF in `assets/files/` and set `cv_pdf: /assets/files/<name>.pdf`.
- To add another case study, copy `projects/sense-of-agency.html`, change its front matter, and set `url: /projects/<name>/` on the matching card in `_data/projects.yml`.
- Colours and spacing are CSS variables at the top of `assets/css/main.css`. The accent is `--accent` (also update `--accent-tint` to match).

## Deploying

1. Replace the contents of the `varshakalubowila.github.io` repo with this folder (delete the old `README.md` / `index.md`, `_config.yml` and `_layouts`).
2. Commit and push to the default branch.
3. In the repo's **Settings → Pages**, the source should be "Deploy from a branch" on that branch, root folder. The site rebuilds in a minute or two.

## Preview locally (optional)

Needs Ruby. Then:

```
bundle install
bundle exec jekyll serve
```

and open http://localhost:4000.
