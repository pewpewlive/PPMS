import { makeStyles, shorthands } from "@fluentui/react-components"
import {
  Box,
  Float,
  FlyControls,
  PointerLockControls,
  SpotLight,
  Stars,
  Svg,
  Text,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

import WhyShouldYouCare from "../assets/PPMS_Logo.svg"

const useStyles = makeStyles({
  stillNothingToSeeHere: {
    ...shorthands.margin("auto"),
    height: "100vh",
  },
})

function NothingToSeeHere() {
  const styles = useStyles()
  return (
    <div className={styles.stillNothingToSeeHere}>
      <Canvas camera={{ position: [0, -5, 10], fov: 90 }}>
        <color attach="background" args={["#000"]} />
        <PointerLockControls />
        <FlyControls rollSpeed={0} autoForward={false} movementSpeed={10} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <group>
          <Box
            args={[15, 20, 0.5]}
            position={[0, -5, 0]}
            material-color="#333"
          />
          <Svg
            fillMaterial={{
              wireframe: false,
            }}
            position={[-0.8, 4.5, 0.26]}
            scale={0.08}
            src={WhyShouldYouCare}
            strokeMaterial={{
              wireframe: false,
            }}
          />
          <Text position={[0, 2, 0.26]} fontSize={1} material-color="#a00">
            The Tortured Souls of PPMS:
          </Text>
          <Text position={[0, 0, 0.26]} fontSize={1} material-color="#a00">
            &gt;&gt;&gt; Development &lt;&lt;&lt;
          </Text>
          <Text position={[0, -2, 0.26]} fontSize={1} material-color="#a00">
            Tasty Kiwi
          </Text>
          <Text position={[0, -3, 0.26]} fontSize={1} material-color="#a00">
            MnHs
          </Text>
          <Text position={[0, -4, 0.26]} fontSize={1} material-color="#a00">
            ArjunBroEpic
          </Text>
          <Text position={[0, -5, 0.26]} fontSize={1} material-color="#a00">
            SKPG-Tech
          </Text>
          <Text position={[0, -7, 0.26]} fontSize={1} material-color="#a00">
            &gt;&gt;&gt; Technical advisors &lt;&lt;&lt;
          </Text>
          <Text position={[0, -9, 0.26]} fontSize={1} material-color="#a00">
            ModEngineer
          </Text>
          <Text position={[0, -10, 0.26]} fontSize={1} material-color="#a00">
            JF
          </Text>
          <Text position={[0, -12, 0.26]} fontSize={1} material-color="#a00">
            &gt;&gt;&gt; Creative lead &lt;&lt;&lt;
          </Text>
          <Text position={[0, -14, 0.26]} fontSize={1} material-color="#a00">
            MutoXicated
          </Text>
          <Text
            position={[0, -5, -0.26]}
            fontSize={1}
            material-color="lightpink"
            rotation={[0, Math.PI, 0]}
          >
            Why are you looking here?
          </Text>
          <SpotLight
            distance={10}
            angle={1}
            attenuation={10}
            position={[0, 7, 0]}
            intensity={0.5}
            penumbra={0.75}
          />
          <SpotLight
            distance={10}
            angle={1}
            attenuation={10}
            position={[0, -17, 0]}
            intensity={0.5}
            penumbra={0.75}
          />
        </group>
        <group>
          <Float
            speed={1.25} // Animation speed, defaults to 1
            rotationIntensity={10} // XYZ rotation intensity, defaults to 1
            floatingRange={[-2.5, 2.5]}
            position={[0, -5, 25]}
          >
            <Box material-color="hotpink" />
          </Float>
          <Text
            position={[0, -1, 25]}
            fontSize={1}
            material-color="hotpink"
            rotation={[0, Math.PI, 0]}
          >
            C U B E
          </Text>
        </group>
      </Canvas>
    </div>
  )
}

export default NothingToSeeHere
