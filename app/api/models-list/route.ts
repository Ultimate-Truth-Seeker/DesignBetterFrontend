import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'components', '3DRender')
    const items = await fs.readdir(dir).catch(() => [])
    const onlyFiles: string[] = []
    for (const name of items) {
      const p = path.join(dir, name)
      try {
        const stat = await fs.stat(p)
        if (stat.isFile() && name.toLowerCase().endsWith('.glb')) {
          onlyFiles.push(name)
        }
      } catch {}
    }
    return NextResponse.json(onlyFiles.sort((a, b) => a.localeCompare(b)))
  } catch (e) {
    console.error('List models error', e)
    return NextResponse.json([], { status: 200 })
  }
}
