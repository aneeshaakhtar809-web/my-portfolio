import { NextRequest, NextResponse } from 'next/server';
import { ProjectItem } from '@/types/portfolio';

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'GitHub username is required' }, { status: 400 });
    }

    const cleanUsername = username.trim().replace(/^@/, '');

    // Fetch GitHub User Info
    const userRes = await fetch(`https://api.github.com/users/${cleanUsername}`, {
      headers: {
        'User-Agent': 'PortfolioOS-App',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!userRes.ok) {
      if (userRes.status === 404) {
        return NextResponse.json({ error: `GitHub user "${cleanUsername}" not found.` }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to fetch GitHub profile' }, { status: userRes.status });
    }

    const userData = await userRes.json();

    // Fetch User's Top Repositories (sorted by updated/stars)
    const reposRes = await fetch(
      `https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=6`,
      {
        headers: {
          'User-Agent': 'PortfolioOS-App',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    const reposData = reposRes.ok ? await reposRes.json() : [];

    // Map repos to ProjectItem format
    const projects: ProjectItem[] = reposData
      .filter((repo: any) => !repo.fork)
      .slice(0, 4)
      .map((repo: any, index: number) => ({
        id: `gh-${repo.id || index}`,
        title: repo.name
          .split(/[-_]/)
          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
        tagline: repo.description ? repo.description.slice(0, 70) : 'Open source engineering repository',
        description: repo.description || 'Architected open-source system with automated testing and continuous integration.',
        metrics: repo.stargazers_count > 0 ? `⭐ ${repo.stargazers_count} GitHub stars & active community forks.` : undefined,
        technologies: [repo.language, 'Git', 'Open Source'].filter(Boolean),
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || undefined,
        featured: index < 2,
      }));

    return NextResponse.json({
      success: true,
      githubProfile: {
        name: userData.name || cleanUsername,
        bio: userData.bio,
        avatarUrl: userData.avatar_url,
        location: userData.location,
        company: userData.company,
        blog: userData.blog,
        publicRepos: userData.public_repos,
        followers: userData.followers,
      },
      extractedProjects: projects,
    });
  } catch (err: any) {
    console.error('GitHub sync error:', err);
    return NextResponse.json({ error: err.message || 'Error syncing GitHub' }, { status: 500 });
  }
}

