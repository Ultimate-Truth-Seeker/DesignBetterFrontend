import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export const runtime = 'nodejs'

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const rawName = params.name
    if (!rawName || !rawName.toLowerCase().endsWith('.glb')) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    // Prevent path traversal
    const safeName = path.basename(rawName)
    const modelDir = path.join(process.cwd(), 'components', '3DRender')
    const modelPath = path.join(modelDir, safeName)

    // Ensure file exists and is within the directory
    const stat = await fs.stat(modelPath).catch(() => null)
    if (!stat || !stat.isFile()) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const data = await fs.readFile(modelPath)

    const res = new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': 'model/gltf-binary',
        'Content-Length': String(data.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Disposition': `inline; filename="${safeName}"`,
      },
    })

    return res
  } catch (err) {
    console.error('Error serving model:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
