"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ButtonUI } from "@/components/ui/button"
import { InputUI } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { HelpCircle, Save, ArrowRight, ArrowLeft, User, Settings, Loader2 } from "lucide-react"
import { MEASUREMENT_SCHEMA, MEASUREMENT_GUIDES, type BodyProfile } from "@/types/body-measurement"
import { MeasurementGuideDialog } from "@/components/measurement-guide-dialog"
import { BodyProfileStorage } from "@/lib/body-profile-storage"
import { TemplateOptionsSelector } from "@/components/template-options-selector"
import { templateApi } from "@/lib/template-api"
import { configurationApi } from "@/lib/configuration-api"
import type { DesignerTemplate } from "@/types/designer-template"
import type { Configuration } from "@/types/configuration"
import dynamic from "next/dynamic";
import { useParams } from "next/navigation"

export default function PersonalizarTemplatePage() {
  const params = useParams()
  const { templateId } = params
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Template data
  const [template, setTemplate] = useState<DesignerTemplate | null>(null)

  // Body measurements state
  const [profileName, setProfileName] = useState("")
  const [gender, setGender] = useState<"male" | "female" | "unisex" | "other">("unisex")
  const [sizeSystem, setSizeSystem] = useState<"US" | "EU" | "UK" | "custom">("EU")
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric")
  const [measurements, setMeasurements] = useState<Record<string, number>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [savedProfileId, setSavedProfileId] = useState<string>("")

  // Template options state
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({})
  const [resolvedParams, setResolvedParams] = useState<Record<string, any>>({})

  // Material assignments state
  const [materialAssignments, setMaterialAssignments] = useState<Record<string, string>>({})

  // Configuration
  const [configuration, setConfiguration] = useState<Configuration | null>(null)

  // Guide dialog state
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)

  // Load existing profiles
  const [savedProfiles, setSavedProfiles] = useState<BodyProfile[]>([])
  const [selectedProfileId, setSelectedProfileId] = useState<string>("")

  const AvatarViewer = dynamic(() => import("./avatarviewer"), { ssr: false });

  const [height, setHeight] = useState(170);
  const [shoulder, setShoulder] = useState(40);
  const [waist, setWaist] = useState(70);
  const [generate, setGenerate] = useState(false);

  const modelUrl = useMemo(
    () => (gender === "female" ? "/female.glb" : "/male.glb"),
    [gender]
  );

  const scale = useMemo(() => {
    const base = { height: 170, shoulder: 40, waist: 70 };
    return [
      shoulder / base.shoulder,
      height / base.height,
      waist / base.waist,
    ] as [number, number, number];
  }, [height, shoulder, waist]);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        setIsLoading(true)
        const templateData = await templateApi.fetchTemplate(templateId as string)
        setTemplate(templateData)
      } catch (error) {
        console.error("[v0] Error loading template:", error)
        alert("Error al cargar la plantilla")
      } finally {
        setIsLoading(false)
      }
    }

    loadTemplate()
    setSavedProfiles(BodyProfileStorage.getProfiles())
  }, [templateId])

  const handleMeasurementChange = (code: string, value: string) => {
    const numValue = Number.parseFloat(value)

    if (value === "") {
      const newMeasurements = { ...measurements }
      delete newMeasurements[code]
      setMeasurements(newMeasurements)
      return
    }

    if (isNaN(numValue)) return

    const schema = MEASUREMENT_SCHEMA.find((m) => m.code === code)
    if (!schema) return

    // Validate range
    if (numValue < schema.min || numValue > schema.max) {
      setErrors({
        ...errors,
        [code]: `Debe estar entre ${schema.min} y ${schema.max} ${schema.unit}`,
      })
    } else {
      const newErrors = { ...errors }
      delete newErrors[code]
      setErrors(newErrors)
      if (code === "waist") {
        setWaist(Number(value))
      } else if (code === "shoulder_width") {
        setShoulder(Number(value))
      } else {
        setHeight(height)
      }
    }

    setMeasurements({ ...measurements, [code]: numValue })
  }

  const validateMeasurements = (): boolean => {
    const newErrors: Record<string, string> = {}

    MEASUREMENT_SCHEMA.forEach((schema) => {
      if (schema.required && !measurements[schema.code]) {
        newErrors[schema.code] = "Este campo es obligatorio"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveProfile = () => {
    if (!profileName.trim()) {
      alert("Por favor ingresa un nombre para el perfil")
      return
    }

    if (!validateMeasurements()) {
      alert("Por favor completa todas las medidas obligatorias correctamente")
      return
    }

    const profile: BodyProfile = {
      id: selectedProfileId || `profile_${Date.now()}`,
      name: profileName,
      gender,
      size_system: sizeSystem,
      unit_system: unitSystem,
      measures: measurements,
      version: 1,
      created_at: new Date().toISOString(),
    }

    BodyProfileStorage.saveProfile(profile)
    setSavedProfiles(BodyProfileStorage.getProfiles())
    setSavedProfileId(profile.id)
    alert("Perfil guardado exitosamente")
  }

  const handleLoadProfile = (profileId: string) => {
    const profile = BodyProfileStorage.getProfile(profileId)
    if (profile) {
      setSelectedProfileId(profile.id)
      setProfileName(profile.name)
      setGender(profile.gender)
      setSizeSystem(profile.size_system)
      setUnitSystem(profile.unit_system)
      setMeasurements(profile.measures)
      setSavedProfileId(profile.id)
    }
  }

  const handleNextStep = () => {
    if (!validateMeasurements()) {
      alert("Por favor completa todas las medidas obligatorias correctamente")
      return
    }

    // Save profile automatically before proceeding
    if (profileName.trim() && !savedProfileId) {
      handleSaveProfile()
    }

    setCurrentStep(1)
  }

  const handleOptionsChange = (options: Record<string, any>, params: Record<string, any>) => {
    setSelectedOptions(options)
    setResolvedParams(params)
  }

  const calculateCostBreakdown = () => {
    const basePrice = 50//template?.base_price || 50
    const materialCosts: Record<string, number> = {}

    // Mock material costs
    Object.keys(materialAssignments).forEach((pieceId) => {
      materialCosts[pieceId] = 10 // Mock cost per piece
    })

    const totalMaterialCost = Object.values(materialCosts).reduce((sum, cost) => sum + cost, 0)
    const customizationFees = Object.keys(selectedOptions).length * 5 // $5 per customization
    const total = basePrice + totalMaterialCost + customizationFees

    return {
      base_price: basePrice,
      material_costs: materialCosts,
      customization_fees: customizationFees,
      total,
    }
  }

  const handleCreateConfiguration = async () => {
    if (!template) return

    try {
      setIsSaving(true)

      const costBreakdown = calculateCostBreakdown()

      const configData: Partial<Configuration> = {
        template_id: templateId as string,
        measurement_source: savedProfileId ? "table" : "custom",
        measurement_table_id: savedProfileId || undefined,
        custom_measures: !savedProfileId ? measurements : undefined,
        selected_options: selectedOptions,
        resolved_params: resolvedParams,
        pieces_2d: null, // Will be implemented later
        material_assignments: materialAssignments,
        cost_breakdown: costBreakdown,
        price_total: costBreakdown.total,
        state: "draft",
      }

      const newConfig = await configurationApi.createConfiguration(configData)
      setConfiguration(newConfig)
      const newcdid = configuration?.id || ""
      console.log(newcdid)

      // Navigate to checkout
      router.push(`/checkout/config_1730720123456`)//${newConfig.id}`)
    } catch (error) {
      console.error("[v0] Error creating configuration:", error)
      alert("Error al crear la configuración")
    } finally {
      setIsSaving(false)
    }
  }

  const steps = [
    { id: 0, name: "Medidas Corporales", icon: User },
    { id: 1, name: "Opciones de Plantilla", icon: Settings },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Plantilla no encontrada</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Personalizar Plantilla</h1>
              <p className="text-sm text-muted-foreground mt-1">{template.name}</p>
            </div>
            <ButtonUI variant="outline" onClick={() => router.back()}>
              Cancelar
            </ButtonUI>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep > step.id
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                  <span className="font-medium">{step.name}</span>
                </div>
                {index < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {currentStep === 0 && (
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">
            <div className="space-y-6">
            {/* Profile Selection */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Perfil de Medidas</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="profile-select">Cargar perfil guardado</Label>
                  <Select value={selectedProfileId} onValueChange={handleLoadProfile}>
                    <SelectTrigger id="profile-select">
                      <SelectValue placeholder="Seleccionar perfil..." />
                    </SelectTrigger>
                    <SelectContent>
                      {savedProfiles.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.name} ({profile.gender}, {profile.size_system})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-name">Nombre del perfil *</Label>
                  <InputUI
                    id="profile-name"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Ej: Mi perfil principal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Género</Label>
                  <Select value={gender} onValueChange={(v: any) => setGender(v)}>
                    <SelectTrigger id="gender">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                      <SelectItem value="unisex">Unisex</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size-system">Sistema de tallas</Label>
                  <Select value={sizeSystem} onValueChange={(v: any) => setSizeSystem(v)}>
                    <SelectTrigger id="size-system">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">US</SelectItem>
                      <SelectItem value="EU">EU</SelectItem>
                      <SelectItem value="UK">UK</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit-system">Sistema de unidades</Label>
                  <Select value={unitSystem} onValueChange={(v: any) => setUnitSystem(v)}>
                    <SelectTrigger id="unit-system">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Métrico (cm)</SelectItem>
                      <SelectItem value="imperial">Imperial (in)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Measurements */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Medidas Corporales</h2>
                <ButtonUI onClick={handleSaveProfile} variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Perfil
                </ButtonUI>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MEASUREMENT_SCHEMA.map((schema) => (
                  <div key={schema.code} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={schema.code} className="flex items-center gap-2">
                        {schema.display_name}
                        {schema.required && <span className="text-destructive">*</span>}
                      </Label>
                      <ButtonUI
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => setSelectedGuide(schema.code)}
                      >
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </ButtonUI>
                    </div>

                    <div className="flex gap-2">
                      <InputUI
                        id={schema.code}
                        type="number"
                        min={schema.min}
                        max={schema.max}
                        step="0.5"
                        value={measurements[schema.code] || ""}
                        onChange={(e) => handleMeasurementChange(schema.code, e.target.value)}
                        placeholder={`${schema.min}-${schema.max}`}
                        className={errors[schema.code] ? "border-destructive" : ""}
                      />
                      <div className="flex items-center justify-center w-12 text-sm text-muted-foreground bg-muted rounded-md">
                        {schema.unit}
                      </div>
                    </div>

                    {errors[schema.code] && <p className="text-sm text-destructive">{errors[schema.code]}</p>}

                    {schema.formula_notes && !errors[schema.code] && (
                      <p className="text-xs text-muted-foreground">{schema.formula_notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <ButtonUI variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </ButtonUI>
              <ButtonUI onClick={handleNextStep}>
                Siguiente: Opciones de Plantilla
                <ArrowRight className="h-4 w-4 ml-2" />
              </ButtonUI>
            </div>
            </div> {/* end left column */}

            {/* Right column: Avatar preview */}
            <div className="sticky top-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Vista previa 3D</h3>

                <button
                  onClick={() => setGenerate(true)}
                  className="bg-black text-white px-6 py-2 rounded-lg mb-4"
                >
                  Generar Avatar
                </button>

                {generate && <AvatarViewer bodyUrl={modelUrl} bodyScale={scale} clothingUrl="/models/suit.glb" clothingScale={[7.4, 7.2, 9.8]}/>}
              </Card>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">
            <div className="space-y-6">
            <Card className="p-6">
              <TemplateOptionsSelector template={template} onOptionsChange={handleOptionsChange} />
            </Card>

            {/* Material Assignments */}
            {[].length > 0 && (//template.pieces && Array.isArray(template.pieces) && template.pieces.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Asignación de Materiales</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Selecciona los materiales para cada pieza del patrón
                </p>

                <div className="space-y-4">
                  {[].map((piece: any) => (//template.pieces.
                    <div key={piece.id} className="flex items-center gap-4">
                      <Label className="w-32">{piece.name}</Label>
                      <Select
                        value={materialAssignments[piece.id] || ""}
                        onValueChange={(value) =>
                          setMaterialAssignments({
                            ...materialAssignments,
                            [piece.id]: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar material..." />
                        </SelectTrigger>
                        <SelectContent>
                          {(template.materials_policy as any)?.[piece.id]?.map((material: string) => (
                            <SelectItem key={material} value={material}>
                              {material}
                            </SelectItem>
                          )) || (
                            <>
                              <SelectItem value="cotton">Algodón</SelectItem>
                              <SelectItem value="polyester">Poliéster</SelectItem>
                              <SelectItem value="wool">Lana</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Cost Summary */}
            <Card className="p-6 bg-muted/50">
              <h3 className="text-lg font-semibold mb-4">Resumen de Costos</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Precio base:</span>
                  <span>${calculateCostBreakdown().base_price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Materiales:</span>
                  <span>
                    ${Object.values(calculateCostBreakdown().material_costs).reduce((sum, cost) => sum + cost, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Personalización:</span>
                  <span>${calculateCostBreakdown().customization_fees}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${calculateCostBreakdown().total}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <ButtonUI variant="outline" onClick={() => setCurrentStep(0)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </ButtonUI>
              <ButtonUI onClick={handleCreateConfiguration} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creando...
                  </>
                ) : (
                  <>
                    Continuar al Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </ButtonUI>
            </div>
            </div> {/* end left column */}

            {/* Right column: Avatar preview */}
            <div className="sticky top-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Vista previa 3D</h3>

                <button
                  onClick={() => setGenerate(true)}
                  className="bg-black text-white px-6 py-2 rounded-lg mb-4"
                >
                  Generar Avatar
                </button>

                {generate && <AvatarViewer bodyUrl={modelUrl} bodyScale={scale} clothingUrl="/models/suit.glb" clothingScale={[7.4, 7.2, 9.8]}/>}
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Measurement Guide Dialog */}
      {selectedGuide && MEASUREMENT_GUIDES[selectedGuide] && (
        <MeasurementGuideDialog
          guide={MEASUREMENT_GUIDES[selectedGuide]}
          open={!!selectedGuide}
          onOpenChange={(open) => !open && setSelectedGuide(null)}
        />
      )}
    </div>
  )
}
