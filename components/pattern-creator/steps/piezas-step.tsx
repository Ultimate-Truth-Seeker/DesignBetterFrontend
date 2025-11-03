"use client"

import { useState } from "react"
import { ButtonUI } from "@/components/ui/button"
import { InputUI } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BadgeUI } from "@/components/ui/badge"
import { Plus, Move, Square, Circle, Minus } from "lucide-react"
import type { Pattern, PatternPiece } from "@/types/pattern"
import { DEFAULT_PIECES } from "@/types/pattern-defaults"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PiezasStepProps {
  pattern: Partial<Pattern>
  onUpdate: (updates: Partial<Pattern>) => void
}

export function PiezasStep({ pattern, onUpdate }: PiezasStepProps) {
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null)
  const [tool, setTool] = useState<"select" | "point" | "line" | "curve">("select")

  const pieces = pattern.pieces || []

  const addPiece = () => {
    const newPiece: PatternPiece = {
      id: `piece_${Date.now()}`,
      name: `Pieza ${pieces.length + 1}`,
      visible: true,
      drawOrder: pieces.length,
      seamAllowance: 1.0,
      notches: [],
      points: [],
      lines: [],
      expressions: {},
    }

    onUpdate({
      pieces: [...pieces, newPiece],
    })

    setSelectedPiece(newPiece.id)
  }

  const updatePiece = (pieceId: string, updates: Partial<PatternPiece>) => {
    const updatedPieces = pieces.map((piece) => (piece.id === pieceId ? { ...piece, ...updates } : piece))

    onUpdate({ pieces: updatedPieces })
  }

  const deletePiece = (pieceId: string) => {
    const updatedPieces = pieces.filter((piece) => piece.id !== pieceId)
    onUpdate({ pieces: updatedPieces })

    if (selectedPiece === pieceId) {
      setSelectedPiece(null)
    }
  }

  const loadDefaultPieces = () => {
    if (!pattern.category || pattern.category === "other") return

    const defaults = DEFAULT_PIECES[pattern.category]
    const newPieces = defaults.map((defaultPiece, index) => ({
      ...defaultPiece,
      id: `piece_${Date.now()}_${index}`,
      drawOrder: pieces.length + index,
    }))

    onUpdate({
      pieces: [...pieces, ...newPieces],
    })
  }

  const selectedPieceData = pieces.find((p) => p.id === selectedPiece)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Diseño de Piezas</h2>
          <p className="text-muted-foreground">
            Crea las piezas geométricas de tu patrón usando herramientas de dibujo paramétrico.
          </p>
        </div>
        <div className="flex gap-2">
          {pattern.category && pattern.category !== "other" && (
            <ButtonUI variant="outline" onClick={loadDefaultPieces}>
              Cargar Piezas Predeterminadas
            </ButtonUI>
          )}
          <ButtonUI onClick={addPiece}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Pieza
          </ButtonUI>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[600px]">
        {/* Pieces List */}
        <div className="col-span-3 border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Piezas</h3>
          <div className="space-y-2">
            {pieces.map((piece) => (
              <div
                key={piece.id}
                className={`p-3 rounded border cursor-pointer transition-colors ${
                  selectedPiece === piece.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
                onClick={() => setSelectedPiece(piece.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{piece.name}</span>
                  <BadgeUI variant={piece.visible ? "default" : "secondary"} className="text-xs">
                    {piece.visible ? "Visible" : "Oculta"}
                  </BadgeUI>
                </div>
                <div className="text-xs opacity-75 mt-1">
                  {piece.points.length} puntos, {piece.lines.length} líneas
                </div>
              </div>
            ))}
            {pieces.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Square className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hay piezas</p>
                <p className="text-xs">Agrega una para comenzar</p>
              </div>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div className="col-span-6 border rounded-lg relative bg-white">
          {/* Toolbar */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <ButtonUI variant={tool === "select" ? "default" : "outline"} size="sm" onClick={() => setTool("select")}>
              <Move className="h-4 w-4" />
            </ButtonUI>
            <ButtonUI variant={tool === "point" ? "default" : "outline"} size="sm" onClick={() => setTool("point")}>
              <Circle className="h-4 w-4" />
            </ButtonUI>
            <ButtonUI variant={tool === "line" ? "default" : "outline"} size="sm" onClick={() => setTool("line")}>
              <Minus className="h-4 w-4" />
            </ButtonUI>
          </div>

          {/* Canvas Content */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Square className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Editor de Piezas</p>
              <p className="text-sm">
                {selectedPieceData ? `Editando: ${selectedPieceData.name}` : "Selecciona una pieza para editar"}
              </p>
              <p className="text-xs mt-2">Herramienta activa: {tool}</p>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="col-span-3 border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Propiedades</h3>
          {selectedPieceData ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="piece-name">Nombre</Label>
                <InputUI
                  id="piece-name"
                  value={selectedPieceData.name}
                  onChange={(e) => updatePiece(selectedPieceData.id, { name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="seam-allowance">Margen de Costura (cm)</Label>
                <InputUI
                  id="seam-allowance"
                  type="number"
                  step="0.1"
                  value={selectedPieceData.seamAllowance}
                  onChange={(e) =>
                    updatePiece(selectedPieceData.id, { seamAllowance: Number.parseFloat(e.target.value) || 0 })
                  }
                />
              </div>

              <div>
                <Label htmlFor="draw-order">Orden de Dibujo</Label>
                <InputUI
                  id="draw-order"
                  type="number"
                  value={selectedPieceData.drawOrder}
                  onChange={(e) =>
                    updatePiece(selectedPieceData.id, { drawOrder: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <Tabs defaultValue="points">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="points">Puntos</TabsTrigger>
                  <TabsTrigger value="expressions">Expresiones</TabsTrigger>
                  <TabsTrigger value="geometry">Geometría</TabsTrigger>
                </TabsList>

                <TabsContent value="points" className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    {selectedPieceData.points.length} puntos definidos
                  </div>
                  {selectedPieceData.points.map((point, index) => (
                    <div key={point.id || index} className="text-xs p-2 bg-accent rounded">
                      <div className="font-mono">{point.id}</div>
                      <div>
                        X: {point.x}, Y: {point.y}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="expressions" className="space-y-2">
                  <div className="text-sm text-muted-foreground">Expresiones paramétricas</div>
                  <div className="space-y-2">
                    {Object.entries(selectedPieceData.expressions).map(([key, expression]) => (
                      <div key={key} className="text-xs p-2 bg-accent rounded">
                        <div className="font-mono">{key}</div>
                        <div className="text-muted-foreground">{expression}</div>
                      </div>
                    ))}
                    <ButtonUI size="sm" variant="outline" className="w-full bg-transparent">
                      <Plus className="h-3 w-3 mr-1" />
                      Agregar Expresión
                    </ButtonUI>
                  </div>
                </TabsContent>

                <TabsContent value="geometry" className="space-y-2">
                  <div className="text-sm text-muted-foreground">Propiedades Geométricas</div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Tipo de Forma</Label>
                      <Select defaultValue="polygon">
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="polygon">Polígono</SelectItem>
                          <SelectItem value="curve">Curva</SelectItem>
                          <SelectItem value="composite">Compuesta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Simetría</Label>
                      <Select defaultValue="none">
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Ninguna</SelectItem>
                          <SelectItem value="horizontal">Horizontal</SelectItem>
                          <SelectItem value="vertical">Vertical</SelectItem>
                          <SelectItem value="both">Ambas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <ButtonUI
                variant="destructive"
                size="sm"
                onClick={() => deletePiece(selectedPieceData.id)}
                className="w-full"
              >
                Eliminar Pieza
              </ButtonUI>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p className="text-sm">Selecciona una pieza para ver sus propiedades</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
