'use client'
import Head from 'next/head'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const EnvironmentMap = () => {
  const renderRef = useRef(null)
  let camera: any = null
  let renderer: any = null

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
    let sphere
    let sphereGeometry = new THREE.SphereGeometry(16, 50, 50)
    sphereGeometry.scale(16, 16, -16)
    let texture = new THREE.TextureLoader().load('/image/livingRoom.jpg')
    let sphereMaterial = new THREE.MeshBasicMaterial({ map: texture })
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphere)

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

    //6.添加提示
    const map = new THREE.TextureLoader().load('image/tip.png')
    const material = new THREE.SpriteMaterial({ map })

    const sprite = new THREE.Sprite(material)
    sprite.scale.set(10, 10, 10)
    sprite.position.set(-200, -4, -147)
    sprite.content = '点我触发点什么----1111'
    scene.add(sprite)

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

  return (
    <>
      <Head>
        <title>My Page Title</title>
      </Head>
      <div ref={renderRef} />
    </>
  )
}

export default EnvironmentMap
