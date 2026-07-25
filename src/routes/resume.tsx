import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { buildPageMeta, buildCanonicalLink } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Download, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Loader2, AlertTriangle, FileText } from 'lucide-react'

export const Route = createFileRoute('/resume')({
  head: () => ({
    meta: [
      ...buildPageMeta({
        title: 'Resume Preview',
        description: "View and download Aswin AK's resume. AI Engineer specializing in RAG systems, Agentic AI, and full-stack development.",
        slug: 'resume',
      }),
      { name: 'keywords', content: 'resume, Aswin AK, AI engineer resume, RAG developer, full-stack developer' },
    ],
    links: [buildCanonicalLink('resume')],
  }),
  component: ResumePage,
})

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

function ResumePage() {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.2)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pdfDocRef = useRef<any>(null)
  const lastRenderTaskRef = useRef<any>(null)

  // 1. Load PDF.js Script from CDN (runs on client only)
  useEffect(() => {
    let active = true
    const scriptSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js'

    // Check if script already exists to avoid duplicates
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement

    const initPDF = async () => {
      try {
        const pdfjsLib = window.pdfjsLib
        if (!pdfjsLib) {
          throw new Error('PDF.js failed to load from CDN')
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'

        const loadingTask = pdfjsLib.getDocument('/resume.pdf')
        const doc = await loadingTask.promise
        if (!active) return

        pdfDocRef.current = doc
        setNumPages(doc.numPages)
        setLoading(false)
      } catch (err: any) {
        console.error('Error loading PDF:', err)
        if (active) {
          setError(err.message || 'Could not load the PDF document.')
          setLoading(false)
        }
      }
    }

    if (typeof window !== 'undefined') {
      if (window.pdfjsLib) {
        initPDF()
      } else {
        script = document.createElement('script')
        script.src = scriptSrc
        script.async = true
        script.onload = () => {
          if (active) initPDF()
        }
        script.onerror = () => {
          if (active) {
            setError('Failed to load PDF preview engine from CDN.')
            setLoading(false)
          }
        }
        document.body.appendChild(script)
      }
    }

    return () => {
      active = false;
    }
  }, [])

  // 2. Render Page to Canvas when pageNumber, scale, or pdfDoc changes
  useEffect(() => {
    const doc = pdfDocRef.current
    if (!doc) return

    let active = true

    const render = async () => {
      try {
        const page = await doc.getPage(pageNumber)
        if (!active) return

        const canvas = canvasRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')
        if (!context) return

        // Cancel any pending render tasks
        if (lastRenderTaskRef.current) {
          lastRenderTaskRef.current.cancel()
        }

        // Adjust scale dynamically if mobile screen
        let renderScale = scale
        if (typeof window !== 'undefined' && window.innerWidth < 640) {
          // If on a small screen, automatically scale it down slightly relative to normal zoom
          renderScale = scale * 0.7
        }

        const viewport = page.getViewport({ scale: renderScale })

        // Use devicePixelRatio for super-crisp text on Retina/High-DPI displays
        const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
        canvas.width = viewport.width * dpr
        canvas.height = viewport.height * dpr
        canvas.style.width = `${viewport.width}px`
        canvas.style.height = `${viewport.height}px`

        context.scale(dpr, dpr)

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        }

        const renderTask = page.render(renderContext)
        lastRenderTaskRef.current = renderTask

        await renderTask.promise
        if (active) {
          lastRenderTaskRef.current = null
        }
      } catch (err: any) {
        if (err.name !== 'RenderingCancelledException') {
          console.error('Rendering error:', err)
        }
      }
    }

    render()

    return () => {
      active = false
    }
  }, [pageNumber, scale, numPages])

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const handleNextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6))
  }

  const handleResetZoom = () => {
    setScale(1.2)
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="inline-block border-2 border-border bg-secondary text-secondary-foreground px-3 py-1 text-xs font-black uppercase tracking-widest mb-6 neo-shadow-sm">
        Interactive Preview
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-5xl font-black mb-2 leading-tight">My Resume</h1>
        </div>

        {/* Direct Download Button */}
        <a
          href="/resume.pdf"
          download="Aswin_AK_Resume.pdf"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange text-white border-2 border-border font-black text-sm uppercase tracking-wide neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:neo-shadow-lg transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <Download className="h-4 w-4" /> Download PDF
        </a>
      </div>

      {/* PDF Viewer Interface */}
      <div className="border-4 border-border bg-card neo-shadow overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="border-b-4 border-border bg-muted p-4 flex flex-wrap items-center justify-between gap-4">
          {/* Page controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={pageNumber <= 1 || loading}
              aria-label="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="font-mono text-sm font-bold border-2 border-border px-3 py-1 bg-background select-none">
              Page {pageNumber} of {numPages || '?'}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={(numPages !== null && pageNumber >= numPages) || loading}
              aria-label="Next Page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={scale <= 0.6 || loading}
              aria-label="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>

            <button
              onClick={handleResetZoom}
              className="font-mono text-sm font-bold border-2 border-border px-3 py-1 bg-background hover:bg-secondary cursor-pointer select-none h-8 flex items-center justify-center"
              title="Reset Zoom"
              disabled={loading}
            >
              {Math.round(scale * 100)}%
            </button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={scale >= 3.0 || loading}
              aria-label="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetZoom}
              disabled={loading}
              title="Reset Scale"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 h-8 px-3 text-xs font-bold border-2 border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all ml-auto"
              title="Open in new tab"
            >
              Open Raw <FileText className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Viewport/Canvas Area */}
        <div className="bg-[#1e1e1e] p-6 min-h-[500px] flex items-center justify-center overflow-auto relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card bg-opacity-95 z-10 transition-opacity">
              <Loader2 className="h-10 w-10 animate-spin text-orange mb-3" />
              <p className="font-mono font-black text-sm uppercase tracking-wider">Loading preview engine...</p>
            </div>
          )}

          {error && (
            <div className="m-8 max-w-md p-6 border-4 border-destructive bg-destructive/10 text-center flex flex-col items-center gap-4">
              <AlertTriangle className="h-10 w-10 text-destructive" />
              <h2 className="font-black text-lg">Preview Failed to Load</h2>
              <p className="text-sm font-medium text-muted-foreground">{error}</p>

              <div className="flex flex-col gap-2 w-full mt-2">
                <a
                  href="/resume.pdf"
                  download="Aswin_AK_Resume.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 h-10 border-2 border-border bg-secondary text-secondary-foreground font-black text-sm uppercase neo-shadow hover:translate-x-[-1px] hover:translate-y-[-1px] hover:neo-shadow-sm transition-all"
                >
                  <Download className="h-4 w-4" /> Download Directly
                </a>

                {/* Fallback iframe solution */}
                <span className="text-xs text-muted-foreground font-bold uppercase mt-2">Or open embedded iframe:</span>
                <iframe src="/resume.pdf" className="w-full h-[400px] border-2 border-border" />
              </div>
            </div>
          )}

          {!loading && !error && (
            <div
              className="border-4 border-border bg-white shadow-2xl transition-all duration-200"
              style={{ transform: 'none' }}
            >
              <canvas ref={canvasRef} className="block mx-auto max-w-full" />
            </div>
          )}
        </div>
      </div>

      {/* Helpful footer tips */}
      <div className="mt-8 flex justify-center items-center p-4 border-2 border-dashed border-border bg-muted font-mono text-xs text-muted-foreground text-center">
        <span>⚡ PRO TIP: Downloading this resume grants +15 velocity and +10 morale to your engineering team. 💾</span>
      </div>
    </div>
  )
}
