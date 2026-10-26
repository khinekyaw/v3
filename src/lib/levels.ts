import { allProjects, professionalProjects, type Project } from "../data/projects"

/** A project's world (professional or experiment) and its "LVL 1-03" label */
export function levelInfo(project: Project) {
  const index = allProjects.findIndex((p) => p.slug === project.slug)
  const isProfessional = professionalProjects.some((p) => p.slug === project.slug)
  const worldIndex = isProfessional ? index : index - professionalProjects.length
  return {
    isProfessional,
    label: `LVL ${isProfessional ? 1 : 2}-${String(worldIndex + 1).padStart(2, "0")}`,
  }
}
