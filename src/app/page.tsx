'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const EnvironmentMap = () => {
  const renderRef = useRef(null)
  let camera: any = null
  let renderer: any = null
  const picList = ['left', 'right', 'top', 'bottom', 'front', 'back']

  const init = () => {
    //1.构建场景,添加背景颜色
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    //2.创建相机
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 5)
    //3.创建物体
    let box
    let boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    let boxMaterials = []
    picList.forEach((item: string) => {
      let texture = new THREE.TextureLoader().load(
        // require(`@/app/assets/image/${item}.png`)
        `/image/${item}.png`
      )
      boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }))
    })
    box = new THREE.Mesh(boxGeometry, boxMaterials)
    box.geometry.scale(10, 10, -10)
    scene.add(box)

    //4.创建渲染器
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderRef.current.appendChild(renderer.domElement)
    //5.创建轨道控制器
    let controls = new OrbitControls(camera, renderer.domElement)
    // controls.autoRotate = true
    // controls.enableZoom = false
    // controls.enableDamping = true
    // controls.enablePan = false
    // controls.enableRotate = true

    function animate() {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()
  }

  const onResize = () => {
    let element = renderRef.current
    if (element) {
      let width = window.innerWidth
      let height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
  }

  useEffect(() => {
    init()
    window.addEventListener('resize', onResize, false)
  }, [])

  return <div ref={renderRef} />
}

export default EnvironmentMap
