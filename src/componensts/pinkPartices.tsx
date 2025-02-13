

import { useEffect, useRef } from "react"

export default function PinkParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles: Particle[] = []

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number

            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                this.size = Math.random() * 5 + 12
                this.speedX = Math.random() * 3 - 1.5
                this.speedY = Math.random() * 3 - 1.5
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.size > 0.2) this.size -= 0.1
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = "rgba(245, 9, 135, 0.66)"
                ctx.beginPath()
                const scale = this.size * 0.15
                ctx.moveTo(this.x, this.y)
                ctx.bezierCurveTo(
                    this.x - 2.5 * scale, this.y - 2.5 * scale,
                    this.x - 5 * scale, this.y + 2.5 * scale,
                    this.x, this.y + 5 * scale
                )
                ctx.bezierCurveTo(
                    this.x + 5 * scale, this.y + 2.5 * scale,
                    this.x + 2.5 * scale, this.y - 2.5 * scale,
                    this.x, this.y
                )

                ctx.fill()
            }
        }

        function handleParticles() {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw()

                if (particles[i].size <= 0.2) {
                    particles.splice(i, 1)
                    i--
                }
            }
        }

        function animate() {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            if (particles.length < 30 && Math.random() < 0.3) { // Lower chance to spawn
                particles.push(new Particle())
            }
            handleParticles()
            requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />
}

