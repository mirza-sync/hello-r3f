# Hello React Three Fiber (R3F)

> Why it was named "Fiber"? They should use Poly or Vertex. Sounds way cooler.

# Dev Logs
- Starting with creating the Earth. [Create the Earth with THREE.js](https://www.youtube.com/watch?v=FntV9iEJ0tU). This one was made with Three.js. I'm doing it with R3F. This will be challenging.

- Today I'm trying to add night lights texture to the earth [b8d6e5a](b8d6e5add8c3b2f744b8083496318cdd926b3c58). Unfortunately only the ligths texture is showing. The earth texture can't be seen. I thought if I put the blending props, then I can see both texture thinking they'll blend with each other but that's not the case. I finally managed to figure the problem. When I reduce the opacity of the texture, the whole sphere was becomes see-through instead of the said texture. Means that I need to add the lights texture to a different mesh instead of putting multiple textures to one mesh:
    ```
    // ❌ Putting all material to one mesh
    <group rotation={[0, 0, (-23.4 * Math.PI / 180)]}>
      <mesh
        {...props}
        ref={earthMeshRef}
      >
        <Sphere />
        <meshStandardMaterial map={earthMap} />
        <meshBasicMaterial map={lightsMat} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>

    // ✔️ Having seperate mesh for every material
    <group rotation={[0, 0, (-23.4 * Math.PI / 180)]}>
      <mesh
        {...props}
        ref={earthMeshRef}
      >
        <Sphere />
        <meshStandardMaterial map={earthMap} />
      </mesh>
      <mesh
        {...props}
        ref={lightsMeshRef}
      >
        <Sphere />
        <meshBasicMaterial map={lightsMat} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
    ```
    - Above code looks redundant. But since each mesh needs their own ref, I don't see any reason to refactor it further. On a side note, when putting all material to one mesh, it will override the former texture since it have the same prop name `map`. Should've used `aoMap`, `alphaMap`, `lightMap`, etc if I need to use multiple texture on a mesh, but for my use case, I need seperate mesh.
    - Also realized that in the tutorial, he uses `new THREE.Mesh` for every material, implying that I need to create a new mesh every time. _Learning from mistakes is the best way to learn._
