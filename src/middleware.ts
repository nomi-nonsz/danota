import { NextRequest, NextResponse } from 'next/server';

const NOCACHE_PATHS = [
  '/notes'
];

class PathFinder {
  public base: string;

  constructor (base: string) {
    this.base = base;
  }

  public startsWith (paths: string[]): boolean {
    return !!paths.find(path => this.base.startsWith(path));
  }
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const finder = new PathFinder(req.nextUrl.basePath);

  // i'm tired of caching in Next.js
  if (finder.startsWith(NOCACHE_PATHS)) {
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
  }

  return res;
}

export const config = {
  matcher: [
    '/notes'
  ],
};