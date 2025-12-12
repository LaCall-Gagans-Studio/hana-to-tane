'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Droplets, Ruler, ArrowRightLeft, X, Save, Check, RefreshCw } from 'lucide-react'
import { getOrCreatePlant, updatePlant, getPlantStats } from './plant-actions'

// --- Types ---
type FloatingTextData = {
  id: string
  x: number
  y: number
  text: string
}

const FloatingText = ({
  x,
  y,
  text,
  onComplete,
}: {
  x: number
  y: number
  text: string
  onComplete: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: y, x: x, scale: 0.5, rotate: (Math.random() - 0.5) * 20 }}
      animate={{ opacity: [0, 1, 0], y: y - 80, scale: [0.5, 1.2, 1] }}
      transition={{ duration: 2, ease: 'easeOut', times: [0, 0.2, 1] }}
      onAnimationComplete={onComplete}
      className="absolute z-40 pointer-events-none font-black text-pink-500 text-2xl shadow-white drop-shadow-md"
      style={{ textShadow: '2px 2px 0px #fff' }}
    >
      {text}
    </motion.div>
  )
}

// --- Types ---
type GameState = 'seed' | 'sprout' | 'growing' | 'bud' | 'flower'
type Environment = 'day' | 'sunset' | 'night'

type PlantData = {
  id: string
  transferId: string // Mnemonic ID
  dna: number // Seed for random generation
  type: string // Plant type key (e.g., 'Classic', 'Sakura')
  state: GameState
  growthProgress: number // 0.0 to 1.0+ (current generation progress)
  streak: number // Consecutive days watered
  hueShift: number // Random color shift
  maxHeight: number // Max height reached (for scaling)
  lastWatered: string | null // ISO date string
  waterCount: number
}

// --- L-System Presets ---
type PlantPreset = {
  name: string
  rules: Record<string, string>
  angle: number
  baseLength: number
  colors: { stem: string; leaf: string; flower: string; berry?: string }
  iterations: {
    seed: number
    sprout: number
    growing: number
    bud: number
    flower: number
  }
}

const PRESETS: Record<string, PlantPreset> = {
  Classic: {
    name: 'Classic Tree',
    rules: {
      X: 'F[+X]F[-X]+X',
      F: 'FF',
    },
    angle: 20,
    baseLength: 3,
    colors: { stem: '#4CAF50', leaf: '#8BC34A', flower: '#FFEB3B' },
    iterations: { seed: 0, sprout: 2, growing: 3, bud: 4, flower: 5 },
  },
  Sakura: {
    name: 'Sakura',
    rules: {
      X: 'F[+X][-X]FX',
      F: 'FF',
    },
    angle: 25,
    baseLength: 2.5,
    colors: { stem: '#5D4037', leaf: '#81C784', flower: '#F48FB1' },
    iterations: { seed: 0, sprout: 2, growing: 3, bud: 4, flower: 5 },
  },
  Fern: {
    name: 'Fern',
    rules: {
      X: 'F[+X]F[-X]FX',
      F: 'FF',
    },
    angle: 22,
    baseLength: 2,
    colors: { stem: '#2E7D32', leaf: '#4CAF50', flower: '#A5D6A7' },
    iterations: { seed: 0, sprout: 2, growing: 3, bud: 4, flower: 5 },
  },
  Vine: {
    name: 'Vine',
    rules: {
      X: 'F[+X]-X',
      F: 'FF',
    },
    angle: 30,
    baseLength: 4,
    colors: { stem: '#33691E', leaf: '#7CB342', flower: '#9C27B0' },
    iterations: { seed: 0, sprout: 2, growing: 3, bud: 4, flower: 5 },
  },
}

// --- Generative Logic ---
const seededRandom = (seed: number) => {
  const m = 0x80000000
  const a = 1103515245
  const c = 12345
  let state = seed ? seed : Math.floor(Math.random() * (m - 1))
  return () => {
    state = (a * state + c) % m
    return state / (m - 1)
  }
}

const randomPick = <T,>(rng: () => number, arr: T[]): T => {
  return arr[Math.floor(rng() * arr.length)]
}

// --- L-System Logic ---
const generateLSystemString = (
  axiom: string,
  rules: Record<string, string>,
  iterations: number,
) => {
  let current = axiom
  for (let i = 0; i < iterations; i++) {
    let next = ''
    for (const char of current) {
      next += rules[char] || char
    }
    current = next
  }
  return current
}

type TurtleState = {
  x: number
  y: number
  angle: number
}

const generateTurtlePath = (
  lString: string,
  angleIncrement: number,
  baseLength: number,
  initialX: number,
  initialY: number,
  rng: () => number,
  growthProgress: number,
  _totalIterations: number,
) => {
  const stack: TurtleState[] = []
  let state: TurtleState = { x: initialX, y: initialY, angle: -90 }
  let pathD = `M${state.x},${state.y}`
  const leaves: { x: number; y: number; angle: number; scale: number }[] = []
  const flowers: { x: number; y: number; scale: number; angle: number }[] = []
  let minY = initialY
  let maxY = initialY

  const getAngle = () => angleIncrement + (rng() - 0.5) * 10
  const growthScale = 1 + growthProgress * 0.3

  for (const char of lString) {
    switch (char) {
      case 'F':
        const length = (baseLength + (rng() - 0.5) * (baseLength * 0.2)) * growthScale
        const newX = state.x + length * Math.cos((state.angle * Math.PI) / 180)
        const newY = state.y + length * Math.sin((state.angle * Math.PI) / 180)
        pathD += ` L${newX},${newY}`
        state.x = newX
        state.y = newY
        if (state.y < minY) minY = state.y
        if (state.y > maxY) maxY = state.y
        break
      case '+':
        state.angle += getAngle()
        break
      case '-':
        state.angle -= getAngle()
        break
      case '[':
        stack.push({ ...state })
        break
      case ']':
        const popped = stack.pop()
        if (popped) {
          state = popped
          pathD += ` M${state.x},${state.y}`
        }
        break
      case 'X':
        if (rng() > 0.7) {
          leaves.push({
            x: state.x,
            y: state.y,
            angle: state.angle,
            scale: (0.5 + rng() * 0.5) * growthScale,
          })
        }
        if (rng() > 0.9) {
          flowers.push({
            x: state.x,
            y: state.y,
            scale: (0.8 + rng() * 0.4) * growthScale,
            angle: state.angle,
          })
        }
        break
    }
  }

  const visualHeight = initialY - minY
  return { pathD, leaves, flowers, visualHeight, minY, maxY }
}

// --- Visual Component ---
const PlantVisual = ({
  data,
  isWatering,
  onHeightChange,
}: {
  data: PlantData
  isWatering: boolean
  onHeightChange: (height: number) => void
}) => {
  const GROUND_Y = 170

  // 看板の高さを定義（SVG座標系での高さ）
  // これを基準にスケール計算を行うことで、植物が小さい時でも看板が見切れないようにする
  const SIGNBOARD_HEIGHT = 40

  const { pathD, leaves, flowers, seedShape, preset, scale, visualHeight } = useMemo(() => {
    const rng = seededRandom(data.dna)
    const presetKey = data.type || 'Classic'
    const originalPreset = PRESETS[presetKey] || PRESETS['Classic']
    const variance = (rng() - 0.5) * 2

    const preset = {
      ...originalPreset,
      // 角度を ±10度 ずらす（これで木の太り方が変わる）
      angle: originalPreset.angle + variance * 10,
      // 枝の基本長さを ±30% 変える（これで背の高さが変わる）
      baseLength: originalPreset.baseLength * (1 + variance * 0.3),
    }

    const seedD = `M50,${GROUND_Y - 25} C60,${GROUND_Y - 25} 65,${GROUND_Y - 20} 65,${GROUND_Y - 10} C65,${GROUND_Y} 55,${GROUND_Y} 50,${GROUND_Y} C45,${GROUND_Y} 35,${GROUND_Y} 35,${GROUND_Y - 10} 35,${GROUND_Y - 20} 40,${GROUND_Y - 25} 50,${GROUND_Y - 25} Z`

    const iterations = preset.iterations[data.state] || 0
    const lString = generateLSystemString('X', preset.rules, iterations)

    const { pathD, leaves, flowers, visualHeight } = generateTurtlePath(
      lString,
      preset.angle,
      preset.baseLength,
      50,
      GROUND_Y,
      rng,
      data.growthProgress,
      iterations,
    )

    // --- Auto-Scaling Logic ---
    const padding = 10
    const availableHeight = GROUND_Y - padding

    // カメラの引き（Zoom Out）計算
    // 現在の植物の高さ、過去最大高さ、そして「看板の高さ」のうち最大のものを基準にする
    // これにより、植物が種の状態でもカメラが寄りすぎず、看板が適切なサイズで表示される
    const targetHeight = Math.max(visualHeight, data.maxHeight || 0, SIGNBOARD_HEIGHT + 10)

    // スケール計算: 画面内に収まるように縮尺を決定
    const calculatedScale =
      targetHeight > availableHeight ? (availableHeight / targetHeight) * 0.9 : 1.0 // デフォルトスケール（あまり寄りすぎない方が看板が見やすい）

    return {
      pathD,
      leaves,
      flowers,
      seedShape: seedD,
      preset,
      scale: calculatedScale,
      visualHeight,
    }
  }, [data.dna, data.state, data.type, data.growthProgress, data.maxHeight])

  useEffect(() => {
    if (visualHeight > (data.maxHeight || 0)) {
      onHeightChange(visualHeight)
    }
  }, [visualHeight, data.maxHeight, onHeightChange])

  const controls = useAnimation()
  const hueRotate = `hue-rotate(${data.hueShift}deg)`

  useEffect(() => {
    if (isWatering) {
      controls.start({
        scale: [1, 1.02, 1],
        rotate: [0, 1, -1, 0],
        transition: { duration: 0.5 },
      })
    }
  }, [isWatering, controls])

  return (
    <div className="relative w-full h-full flex items-end justify-center overflow-visible pb-8">
      <motion.svg
        width="100%"
        height="100%"
        viewBox={`0 0 100 ${GROUND_Y}`}
        className="overflow-visible"
        style={{ filter: hueRotate }}
      >
        <defs>
          <filter
            id="paper-texture"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1">
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
            <feComposite operator="in" in2="SourceGraphic" />
            <feBlend mode="multiply" in2="SourceGraphic" />
          </filter>

          <filter
            id="watercolor"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>

        {/* 全体カメラグループ（Zoom制御）: 看板もこの中にあるため、一緒に小さくなる */}
        <motion.g
          animate={{ scale: scale }}
          transition={{ duration: 1 }}
          style={{ originX: 0.5, originY: 1 }}
        >
          {/* 【変更点】
            静止オブジェクト（看板、影、草）をバウンス用グループの外に出しました。
            これにより、水やり時のバウンスや風の影響を受けなくなりますが、
            上の親グループ（Zoom制御）の中にはいるので、植物と一緒に縮小はされます。
          */}
          <g filter="url(#paper-texture)">
            {/* 影 */}
            <ellipse
              cx="50"
              cy={GROUND_Y}
              rx="15"
              ry="3"
              fill="rgba(0,0,0,0.2)"
              filter="blur(2px)"
            />

            {/* 看板（サイズ比較用オブジェクト） */}
            <g transform={`translate(85, ${GROUND_Y})`}>
              {/* 支柱 */}
              <line
                x1="0"
                y1="0"
                x2="0"
                y2={-SIGNBOARD_HEIGHT}
                stroke="#795548"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* 看板板面 */}
              <rect
                x="-12"
                y={-SIGNBOARD_HEIGHT}
                width="24"
                height="16"
                rx="1"
                fill="#D7CCC8"
                stroke="#5D4037"
                strokeWidth="1.5"
              />
              <rect
                x="-10"
                y={-SIGNBOARD_HEIGHT + 2}
                width="20"
                height="12"
                rx="0.5"
                fill="none"
                stroke="#A1887F"
                strokeWidth="0.5"
                strokeDasharray="2 1"
              />

              {/* 文字 */}
              <text
                x="0"
                y={-SIGNBOARD_HEIGHT + 7}
                textAnchor="middle"
                fontSize="3"
                fill="#5D4037"
                fontWeight="bold"
                style={{ fontFamily: 'sans-serif' }}
              >
                はなたね
              </text>
              <text
                x="0"
                y={-SIGNBOARD_HEIGHT + 12}
                textAnchor="middle"
                fontSize="4"
                fill="#3E2723"
                fontWeight="bold"
                style={{ fontFamily: 'sans-serif' }}
              >
                GARDEN
              </text>

              {/* 比較用の目盛り */}
              <line
                x1="-3"
                y1="-10"
                x2="3"
                y2="-10"
                stroke="#8D6E63"
                strokeWidth="1"
                opacity="0.5"
              />
              <line
                x1="-3"
                y1="-20"
                x2="3"
                y2="-20"
                stroke="#8D6E63"
                strokeWidth="1"
                opacity="0.5"
              />
            </g>

            {/* 草 */}
            <g transform={`translate(50, ${GROUND_Y})`}>
              {[...Array(5)].map((_, i) => (
                <motion.path
                  key={`grass-${i}`}
                  d={`M${(i - 2) * 8},0 Q${(i - 2) * 8 + (i % 2 ? -2 : 2)},-10 ${(i - 2) * 8},0`}
                  stroke="#8BC34A"
                  strokeWidth="2"
                  fill="none"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                />
              ))}
            </g>
          </g>

          {/* 水やりバウンス用グループ（植物のみに適用） */}
          <motion.g
            animate={controls}
            style={{ originX: 0.5, originY: 1 }}
            className={'overflow-visible'}
          >
            {/* 植物オブジェクト（風で常時揺れる） */}
            <motion.g
              animate={{ rotate: [0, 2, 0, -1, 0] }}
              transition={{ rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
              style={{ originX: 0.5, originY: 1 }}
              className={'overflow-visible'}
            >
              <g filter="url(#paper-texture)">
                <AnimatePresence>
                  {data.state === 'seed' && (
                    <motion.g
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{ originX: 0.5, originY: 1 }}
                    >
                      <path
                        d={seedShape}
                        fill="#8D6E63"
                        stroke="#5D4037"
                        strokeWidth="2"
                        filter="url(#watercolor)"
                        className="overflow-visible"
                      />
                    </motion.g>
                  )}
                </AnimatePresence>

                {data.state !== 'seed' && (
                  <motion.g
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1, rotate: [0, 1, 0, -1, 0] }}
                    transition={{
                      duration: 1,
                      rotate: { duration: 5 + (data.dna % 3), repeat: Infinity, ease: 'easeInOut' },
                    }}
                    style={{ originX: 0.5, originY: 1 }}
                    className={'overflow-visible'}
                  >
                    <motion.path
                      d={pathD}
                      stroke={preset.colors.stem}
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#watercolor)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5 }}
                      className="overflow-visible"
                    />
                    {leaves.map((leaf, i) => {
                      // タイプによってパスを切り替え
                      let leafPath = 'M0,0 Q5,-5 10,0 Q5,5 0,0' // デフォルト（丸い葉）

                      if (data.type === 'Fern') {
                        // シダ植物ならギザギザに
                        leafPath = 'M0,0 L5,-2 L10,0 L5,2 Z'
                      } else if (data.type === 'Sakura') {
                        // 桜なら少し細長く
                        leafPath = 'M0,0 Q5,-8 12,0 Q5,8 0,0'
                      }

                      return (
                        <motion.path
                          key={`leaf-${i}`}
                          d={leafPath}
                          fill={preset.colors.leaf}
                          stroke="none"
                          initial={{ scale: 0 }}
                          animate={{
                            scale: leaf.scale,
                            rotate: [leaf.angle, leaf.angle + 5, leaf.angle],
                          }}
                          transition={{
                            scale: { delay: 0.5 + i * 0.05, type: 'spring' },
                            rotate: {
                              duration: 4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: i * 0.1,
                            },
                          }}
                          style={{ originX: 0, originY: 0, x: leaf.x, y: leaf.y }}
                          filter="url(#watercolor)"
                          className="overflow-visible"
                        />
                      )
                    })}
                    {(data.state === 'bud' || data.state === 'flower') &&
                      flowers.map((flower, i) => (
                        <motion.g
                          key={`flower-${i}`}
                          initial={{ scale: 0 }}
                          animate={{
                            scale: data.state === 'flower' ? flower.scale : flower.scale * 0.3,
                          }}
                          transition={{ delay: 1 + i * 0.05, type: 'spring' }}
                          style={{ originX: 0.5, originY: 0.5, x: flower.x, y: flower.y }}
                          className="overflow-visible"
                        >
                          <circle r="3" fill={preset.colors.flower} filter="url(#watercolor)" />
                          {data.state === 'flower' && <circle r="1.5" fill="#FFF" opacity="0.5" />}
                        </motion.g>
                      ))}
                  </motion.g>
                )}
              </g>
            </motion.g>
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  )
}

// --- Main Component ---
export const HeroFlower = () => {
  // State
  const [plant, setPlant] = useState<PlantData>({
    id: 'init',
    transferId: '',
    dna: 0,
    type: 'Classic',
    state: 'seed',
    growthProgress: 0,
    streak: 0,
    hueShift: 0,
    maxHeight: 0,
    lastWatered: null,
    waterCount: 0,
  })
  const [messages, setMessages] = useState<string[]>([
    'はなとたね の せかいへ ようこそ！',
    'あなただけの はなを そだてよう！',
  ])
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [transferIdInput, setTransferIdInput] = useState('')
  const [isWatering, setIsWatering] = useState(false)

  const [debugMode, setDebugMode] = useState(false)
  const [floatingTexts, setFloatingTexts] = useState<FloatingTextData[]>([])
  const [environment, setEnvironment] = useState<Environment>('day')
  const [globalStats, setGlobalStats] = useState({ totalHeight: 0, maxUserHeight: 0 })

  // Time of Day Logic
  useEffect(() => {
    const updateEnvironment = () => {
      const hour = new Date().getHours()
      if (hour >= 6 && hour < 16) setEnvironment('day')
      else if (hour >= 16 && hour < 19) setEnvironment('sunset')
      else setEnvironment('night')
    }
    updateEnvironment()
    const interval = setInterval(updateEnvironment, 60000)
    return () => clearInterval(interval)
  }, [])

  // Load from Server (init)
  useEffect(() => {
    const initPlant = async () => {
      const savedId = localStorage.getItem('hana_transfer_id') || undefined
      try {
        const data = await getOrCreatePlant(savedId)
        // Transform Payload Data to PlantData if necessary (assuming matching fields for now)
        // Ensure type cast or mapping
        const mappedData: PlantData = {
          id: String(data.id),
          transferId: data.transferId as string,
          dna: data.dna,
          type: data.type,
          state: data.state as GameState,
          growthProgress: data.growthProgress || 0,
          streak: data.streak || 0,
          hueShift: data.hueShift || 0,
          maxHeight: data.maxHeight || 0,
          lastWatered: data.lastWatered || null,
          waterCount: data.waterCount || 0,
        }
        setPlant(mappedData)
        if (data.transferId) {
          localStorage.setItem('hana_transfer_id', data.transferId as string)
        }
        if (savedId) {
          addMessage('おかえりなさい！ データ を ロード しました！')
        } else {
          addMessage('あたらしい たね を うえました！')
        }
      } catch (error) {
        console.error('Failed to load plant:', error)
        addMessage('データの読み込みに失敗しました。')
      }
    }
    initPlant()
  }, [])

  // Poll Global Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getPlantStats()
        setGlobalStats(stats)
      } catch (error) {
        console.error('Failed to fetch stats', error)
      }
    }
    fetchStats()
    const interval = setInterval(fetchStats, 60000) // 1 min
    return () => clearInterval(interval)
  }, [])

  const addMessage = (msg: string) => {
    setMessages((prev) => [msg, ...prev].slice(0, 3))
  }

  const handleWater = async () => {
    if (isWatering) return
    if (plant.id === 'init') return

    const today = new Date().toISOString().split('T')[0]
    const lastWateredDate = plant.lastWatered ? plant.lastWatered.split('T')[0] : null

    if (!debugMode && lastWateredDate === today) {
      addMessage('きょうは もう みずを あげたよ！')
      return
    }

    setIsWatering(true)
    addMessage('みずを あげた！')

    const newText: FloatingTextData = {
      id: crypto.randomUUID(),
      x: 0,
      y: -100,
      text: randomPick(() => Math.random(), ['Nice!', 'Good!', 'Lovely!', '+0.5cm', 'Grow!']),
    }
    setFloatingTexts((prev) => [...prev, newText])

    // Delay for animation
    setTimeout(async () => {
      let growthAmount = 0.1 + Math.random() * 0.1
      if (plant.state === 'seed') {
        growthAmount = 1.0
      }

      let newGrowthProgress = plant.growthProgress + growthAmount
      let newState = plant.state
      const newWaterCount = plant.waterCount + 1

      let newStreak = plant.streak
      if (lastWateredDate) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]
        if (lastWateredDate === yesterdayStr) {
          newStreak += 1
        } else if (lastWateredDate !== today) {
          newStreak = 1
        }
      } else {
        newStreak = 1
      }

      // State transition logic (Generation up)
      if (newGrowthProgress >= 1.0) {
        let nextState: GameState | null = null
        if (newState === 'seed') nextState = 'sprout'
        else if (newState === 'sprout') nextState = 'growing'
        else if (newState === 'growing') nextState = 'bud'
        else if (newState === 'bud') nextState = 'flower'

        if (nextState) {
          newGrowthProgress -= 1.0
          newState = nextState
          const stateLabels: { [key: string]: string } = {
            seed: 'たね',
            sprout: 'め',
            growing: 'くき',
            bud: 'つぼみ',
            flower: 'はな',
          }
          const label = stateLabels[newState] || newState
          addMessage(`おや...？ たねの ようすが...！ -> ${label} になった！`)
        } else {
          addMessage('はな は さらに おおきく なった！')
        }
      } else {
        addMessage('ぐんぐん のびている！')
      }

      const updatedData = {
        growthProgress: newGrowthProgress,
        streak: newStreak,
        lastWatered: new Date().toISOString(),
        waterCount: newWaterCount,
        state: newState,
        maxHeight: plant.maxHeight, // Keep existing max for now, visual update will trigger save later
      }

      // Optimistic update
      const updatedPlant = { ...plant, ...updatedData }
      setPlant(updatedPlant)
      setIsWatering(false)

      // Sync with server
      try {
        await updatePlant(plant.id, updatedData)
      } catch (error) {
        console.error('Failed to sync water update:', error)
        addMessage('データのほぞんに しっぱいしました...')
      }
    }, 800)
  }

  // Update Max Height on Server when visual height changes significantly
  const updateMaxHeightRef = useCallback(
    async (h: number) => {
      if (h > plant.maxHeight) {
        try {
          await updatePlant(plant.id, { maxHeight: h })
          setPlant((prev) => ({ ...prev, maxHeight: h })) // Sync local
        } catch (error) {
          console.error('Failed to update max height:', error)
        }
      }
    },
    [plant.id, plant.maxHeight],
  )

  // Throttle height updates if needed, but for now direct call inside onHeightChange wrapper is fine
  // Actually, we pass onHeightChange to PlantVisual.
  // Let's modify PlantVisual prop to just call setPlant strictly, and use useEffect to sync server?
  // Or just call server here. Debouncing recommended for high freq updates.
  // For simplicity, we only update if (h > plant.maxHeight + 1) or similar.
  // PlantVisual calls it only when visualHeight > data.maxHeight.

  const handleCheckHeight = () => {
    addMessage(`げんざいの たかさは ${Math.round(plant.maxHeight)}cm だ！`)
  }

  const handleTransfer = async () => {
    if (!transferIdInput) return
    if (plant.id === 'init') return

    // Debug Commands
    if (transferIdInput === 'debug-godmode') {
      setDebugMode((prev) => !prev)
      addMessage('デバッグモード切り替え！')
      setShowTransferModal(false)
      setTransferIdInput('')
      return
    }

    addMessage('さがしています...')
    try {
      const data = await getOrCreatePlant(transferIdInput)
      const mappedData: PlantData = {
        id: String(data.id),
        transferId: data.transferId as string,
        dna: data.dna,
        type: data.type,
        state: data.state as GameState,
        growthProgress: data.growthProgress || 0,
        streak: data.streak || 0,
        hueShift: data.hueShift || 0,
        maxHeight: data.maxHeight || 0,
        lastWatered: data.lastWatered || null,
        waterCount: data.waterCount || 0,
      }
      setPlant(mappedData)
      if (data.transferId) {
        localStorage.setItem('hana_transfer_id', data.transferId as string) // Update local storage
      }
      addMessage('データを ひきつぎました！')
      setShowTransferModal(false)
      setTransferIdInput('')
    } catch (error) {
      console.error('Transfer failed', error)
      addMessage('データが みつかりませんでした。')
    }
  }

  const handleChangeSeed = async () => {
    if (!confirm('本当に たねを かえますか？\n(いまの 植物は リセットされます)')) return

    addMessage('たねを かえています...')
    try {
      const rng = seededRandom(Date.now())
      const newDna = Math.floor(rng() * 1000000)
      const newType = randomPick(rng, Object.keys(PRESETS))

      const resetData = {
        dna: newDna,
        type: newType,
        state: 'seed',
        growthProgress: 0,
        streak: 0,
        hueShift: Math.floor(rng() * 60) - 30,
        maxHeight: 0,
        lastWatered: null,
        waterCount: 0,
      }

      await updatePlant(plant.id, resetData)

      // Update local
      setPlant((prev) => ({
        ...prev,
        ...resetData,
        state: 'seed' as GameState,
      }))
      addMessage('あたらしい たね に なりました！')
      // Close modal if open (reuse transfer modal logic? or separate?)
      setShowTransferModal(false)
    } catch (error) {
      console.error('Change seed failed', error)
      addMessage('エラーが はっせいしました。')
    }
  }

  const isWateredToday = () => {
    if (debugMode) return false
    if (!plant.lastWatered) return false
    const today = new Date().toISOString().split('T')[0]
    return plant.lastWatered.split('T')[0] === today
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      <motion.div className="bg-white border-4 border-slate-800 rounded-xl shadow-lg overflow-visible relative h-[500px] w-full perspective-1000">
        <div
          className="w-full h-full relative flex items-end justify-center overflow-visible p-8 transition-colors duration-1000"
          style={{
            background:
              environment === 'day'
                ? 'linear-gradient(to bottom, #bae6fd 0%, #dbeafe 100%)'
                : environment === 'sunset'
                  ? 'linear-gradient(to bottom, #fdba74 0%, #fca5a5 40%, #c084fc 100%)'
                  : '#0f172a',
          }}
        >
          <div
            className={`absolute inset-0 opacity-20 bg-[radial-gradient(#4CAF50_2px,transparent_2px)] bg-size-[20px_20px] ${environment === 'night' ? 'opacity-5' : ''}`}
          ></div>

          <AnimatePresence>
            {environment === 'day' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`cloud-${i}`}
                    className="absolute bg-white/40 rounded-full blur-xl"
                    style={{
                      width: 100 + Math.random() * 100,
                      height: 40 + Math.random() * 40,
                      top: `${10 + Math.random() * 30}%`,
                      left: -200,
                    }}
                    animate={{ x: ['0vw', '120vw'] }}
                    transition={{
                      duration: 30 + Math.random() * 20,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 10,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {environment === 'night' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`firefly-${i}`}
                    className="absolute w-1 h-1 bg-yellow-300 rounded-full shadow-[0_0_8px_2px_rgba(253,224,71,0.6)]"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.random() * 20 - 10, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {environment !== 'night' && (
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full opacity-50"
                  style={{
                    width: Math.random() * 5 + 2,
                    height: Math.random() * 5 + 2,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [0, 0.8, 0],
                    x: [0, Math.random() * 50 - 25],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            className={`absolute bottom-0 w-full h-[80px] border-t-4 border-slate-800 z-20 transition-colors duration-1000 ${
              environment === 'night' ? 'bg-[#3E2723] border-slate-700' : 'bg-[#8D6E63]'
            }`}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
          ></motion.div>

          <motion.div
            className="relative z-10 w-full h-full flex items-end justify-center pb-6 overflow-visible"
            style={{
              transformStyle: 'preserve-3d',
              filter:
                environment === 'night'
                  ? 'brightness(0.7) drop-shadow(0 0 10px rgba(255,255,255,0.2))'
                  : environment === 'sunset'
                    ? 'sepia(0.2)'
                    : 'none',
            }}
          >
            {environment === 'sunset' && (
              <div className="absolute inset-0 bg-orange-500/20 mix-blend-overlay pointer-events-none z-20" />
            )}
            <PlantVisual data={plant} isWatering={isWatering} onHeightChange={updateMaxHeightRef} />

            <AnimatePresence>
              {isWatering && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 z-30"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Droplets size={48} fill="currentColor" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {floatingTexts.map((ft) => (
              <div
                key={ft.id}
                className="absolute top-1/2 left-1/2"
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                <FloatingText
                  x={ft.x}
                  y={ft.y}
                  text={ft.text}
                  onComplete={() => setFloatingTexts((prev) => prev.filter((p) => p.id !== ft.id))}
                />
              </div>
            ))}
          </AnimatePresence>

          <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
            <div className="bg-white/90 backdrop-blur border-4 border-slate-800 px-4 py-2 rounded-xl shadow-lg transform -rotate-2">
              <p className="text-xs font-bold text-gray-500">あなたの おはな</p>
              <p className="text-2xl font-black text-pink-500">{Math.round(plant.maxHeight)}cm</p>
            </div>
            <div className="bg-white/90 backdrop-blur border-4 border-slate-800 px-4 py-2 rounded-xl shadow-lg transform rotate-1 mt-2">
              <p className="text-xs font-bold text-gray-500">せかいきろく</p>
              <p className="text-xl font-black text-purple-500">
                {Math.round(globalStats.maxUserHeight)}cm
              </p>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-30 flex flex-col gap-2 items-end">
            <div className="bg-white/90 backdrop-blur border-4 border-slate-800 px-4 py-2 rounded-xl shadow-lg transform rotate-2">
              <p className="text-xs font-bold text-gray-500">みんなの ごうけい</p>
              <p className="text-2xl font-black text-blue-500">
                {Math.round(globalStats.totalHeight)}cm
              </p>
            </div>
            {plant.streak > 1 && (
              <div className="bg-yellow-400 border-4 border-slate-800 px-3 py-1 rounded-lg shadow-sm transform rotate-1">
                <span className="text-xs font-black text-slate-800">連続 {plant.streak}日目！</span>
              </div>
            )}
          </div>

          {debugMode && (
            <div className="absolute bottom-20 left-4 bg-red-500/80 text-white backdrop-blur border-2 border-slate-800 px-3 py-1 rounded-lg text-xs font-bold shadow-sm animate-pulse z-30">
              DEBUG MODE
            </div>
          )}
        </div>
      </motion.div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-slate-800 border-4 border-slate-800 rounded-xl p-1 relative overflow-visible shadow-lg min-h-[120px]">
          <div className="absolute inset-0 bg-white translate-x-1 translate-y-1 rounded-lg border-2 border-slate-800"></div>
          <div className="relative z-10 p-4 h-full flex flex-col-reverse justify-end font-mono text-sm md:text-base leading-relaxed text-slate-800">
            {messages.map((msg, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-1 first:mb-0 first:text-pink-600 font-bold"
              >
                {i === 0 ? '> ' : '   '}
                {msg}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWater}
            disabled={isWateredToday() && !debugMode}
            className={`w-full py-3 px-4 rounded-xl border-4 border-slate-800 font-black text-lg flex items-center justify-center gap-2 shadow-lg transition-colors
                          ${isWateredToday() && !debugMode ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-500 shadow-none' : 'bg-blue-500 text-white hover:bg-blue-400'}
                        `}
          >
            {isWateredToday() && !debugMode ? <Check size={20} /> : <Droplets size={20} />}
            {isWateredToday() && !debugMode ? 'みずやりずみ' : 'みずをやる'}
          </motion.button>

          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckHeight}
              className="w-full py-2 px-2 rounded-xl border-4 border-slate-800 font-bold text-sm text-slate-800 bg-yellow-400 flex items-center justify-center gap-1 shadow-lg hover:bg-yellow-300"
            >
              <Ruler size={16} />
              たかさ
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowTransferModal(true)}
              className="w-full py-2 px-2 rounded-xl border-4 border-slate-800 font-bold text-sm text-slate-800 bg-white flex items-center justify-center gap-1 shadow-lg hover:bg-gray-100"
            >
              <ArrowRightLeft size={16} />
              メニュー
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showTransferModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border-4 border-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-xl relative"
            >
              <button
                onClick={() => setShowTransferModal(false)}
                className="absolute top-4 right-4 text-slate-800 hover:text-pink-500"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <Save size={24} />
                データかんり
              </h3>

              <div className="mb-6">
                <p className="text-sm font-bold text-gray-500 mb-2">あなたのID (合言葉)</p>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-center border-2 border-gray-200 select-all text-slate-600">
                  {plant.transferId || 'Generating...'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={handleChangeSeed}
                  className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl border-2 border-slate-800 bg-orange-100 hover:bg-orange-200 transition-colors"
                >
                  <RefreshCw size={20} className="text-orange-600" />
                  <span className="text-xs font-bold text-orange-800">たねをかえる</span>
                </button>
              </div>

              <div className="mb-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">または</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-bold text-gray-500 mb-2">ひきつぐID（合言葉）を入力</p>
                <input
                  type="text"
                  value={transferIdInput}
                  onChange={(e) => setTransferIdInput(e.target.value)}
                  className="w-full bg-white p-3 rounded-lg font-mono text-center border-2 border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                  placeholder="apple-green-sky-dream"
                />
              </div>

              <button
                onClick={handleTransfer}
                className="w-full py-3 bg-green-500 text-white font-black rounded-xl border-3 border-slate-800 shadow-lg hover:translate-y-1 hover:shadow-none transition-all"
              >
                ひきつぎ じっこう
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
