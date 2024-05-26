// tests/setup.js
import { vi } from 'vitest'

// Mock for HTMLCanvasElement and CanvasRenderingContext2D
global.HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation(() => {
  return {
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    getImageData: vi.fn().mockImplementation((_x: number, _y: number, w: number, h: number) => {
      return {
        data: new Uint8ClampedArray(w * h * 4)
      }
    }),
    putImageData: vi.fn(),
    createImageData: vi.fn().mockImplementation(() => {
      return []
    }),
    setTransform: vi.fn(),
    drawImage: vi.fn(),
    save: vi.fn(),
    fillText: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    measureText: vi.fn().mockImplementation((text: string) => {
      return { width: text.length * 10 }
    }),
    transform: vi.fn(),
    rect: vi.fn(),
    clip: vi.fn()
  }
})
