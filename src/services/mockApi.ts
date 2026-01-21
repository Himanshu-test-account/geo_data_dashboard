import projects from "../data/projects.json";

// Fake logged-in user
export function getLoggedInUser(): Promise<{ name: string } | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Demo User" });
    }, 300);
  });
}

// Fake API call to fetch projects
export function fetchProjects() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projects);
    }, 500);
  });
}
