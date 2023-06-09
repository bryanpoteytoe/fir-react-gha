import { logger } from "./logger";
import { getFirebaseProject } from "./management/projects";
import { needProjectId } from "./projectUtils";

/**
 * Tries to determine the default hosting site for a project, else falls back to projectId.
 * @param options The command-line options object
 * @return The hosting site ID
 */
export async function getDefaultHostingSite(options: any): Promise<string> {
  const projectId = needProjectId(options);
  const project = await getFirebaseProject(projectId);
  const site = project.resources?.hostingSite;
  if (!site) {
    logger.debug(
      `No default hosting site found for project: ${options.project}. Using projectId as hosting site name.`
    );
    return options.project;
  }
  return site;
}
