For Android to work place below code for build.gradle of mapbox android
also in package.json use exact these version to work correctly.
    "react-redux": "^7.2.8",
    "redux": "^4.2.0",
    "@react-native-async-storage/async-storage": "^1.17.3",

// android/build.gradle

// based on:
//
// * https://github.com/facebook/react-native/blob/0.60-stable/template/android/build.gradle
//   original location:
//   - https://github.com/facebook/react-native/blob/0.58-stable/local-cli/templates/HelloWorld/android/build.gradle
//
// * https://github.com/facebook/react-native/blob/0.60-stable/template/android/app/build.gradle
//   original location:
//   - https://github.com/facebook/react-native/blob/0.58-stable/local-cli/templates/HelloWorld/android/app/build.gradle

// https://www.cognizantsoftvision.com/blog/creating-an-android-native-module-for-react-native/

def DEFAULT_COMPILE_SDK_VERSION = 28
def DEFAULT_BUILD_TOOLS_VERSION = '28.0.3'
def DEFAULT_MIN_SDK_VERSION = 19
def DEFAULT_TARGET_SDK_VERSION = 28

def safeExtGet(prop, fallback) {
    rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
}

apply plugin: 'com.android.library'
apply plugin: 'kotlin-android'
//apply plugin: 'maven'
apply plugin: 'maven-publish'


buildscript {
    ext.kotlin_version = '1.4.10'
    // The Android Gradle plugin is only required when opening the android folder stand-alone.
    // This avoids unnecessary downloads and potential conflicts when the library is included as a
    // module dependency in an application project.
    // ref: https://docs.gradle.org/current/userguide/tutorial_using_tasks.html#sec:build_script_external_dependencies
    if (project == rootProject) {
        repositories {
            google()
            jcenter()
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:3.4.1'
        }
    }

    repositories {
        mavenCentral()
    }

    dependencies {
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

apply plugin: 'com.android.library'
apply plugin: 'kotlin-android'
//apply plugin: 'maven'
apply plugin: 'maven-publish'

android {
    compileSdkVersion safeExtGet('compileSdkVersion', DEFAULT_COMPILE_SDK_VERSION)
    buildToolsVersion safeExtGet('buildToolsVersion', DEFAULT_BUILD_TOOLS_VERSION)
    defaultConfig {
        minSdkVersion safeExtGet('minSdkVersion', DEFAULT_MIN_SDK_VERSION)
        targetSdkVersion safeExtGet('targetSdkVersion', DEFAULT_TARGET_SDK_VERSION)
        versionCode 1
        versionName "1.0"
    }
    lintOptions {
        abortOnError false
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

repositories {
    // ref: https://www.baeldung.com/maven-local-repository
    mavenLocal()
    maven {
        // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
        url "$rootDir/../node_modules/react-native/android"
    }
    maven {
        // Android JSC is installed from npm
        url "$rootDir/../node_modules/jsc-android/dist"
    }
    google()
    jcenter()
}

dependencies {
    //noinspection GradleDynamicVersion
    implementation 'com.facebook.react:react-native:+'  // From node_modules
    implementation 'com.mapbox.navigation:core:1.5.0'
    implementation 'com.mapbox.navigation:ui:1.5.0'
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
}

def configureReactNativePom(def pom) {
    def packageJson = new groovy.json.JsonSlurper().parseText(file('../package.json').text)

    pom.project {
        name packageJson.title
        artifactId packageJson.name
        version = packageJson.version
        group = "com.homee.mapboxnavigation"
        description packageJson.description
        url packageJson.repository.baseUrl

        licenses {
            license {
                name packageJson.license
                url packageJson.repository.baseUrl + '/blob/master/' + packageJson.licenseFilename
                distribution 'repo'
            }
        }
    }
}

afterEvaluate { project ->
    // some Gradle build hooks ref:
    // https://www.oreilly.com/library/view/gradle-beyond-the/9781449373801/ch03.html
    task androidJavadoc(type: Javadoc) {
        source = android.sourceSets.main.java.srcDirs
        classpath += files(android.bootClasspath)
//        classpath += files(project.getConfigurations().getByName('compile').asList())
        include '**/*.java'
    }

    task androidJavadocJar(type: Jar, dependsOn: androidJavadoc) {
        classifier = 'javadoc'
        from androidJavadoc.destinationDir
    }

    task androidSourcesJar(type: Jar) {
        classifier = 'sources'
        from android.sourceSets.main.java.srcDirs
        include '**/*.java'
    }

    android.libraryVariants.all { variant ->
        def name = variant.name.capitalize()
        def javaCompileTask = variant.javaCompileProvider.get()

        task "jar${name}"(type: Jar, dependsOn: javaCompileTask) {
            from javaCompileTask.destinationDir
        }
    }

    artifacts {
        archives androidSourcesJar
        archives androidJavadocJar
    }

    task installArchives(type: Upload) {
        configuration = configurations.archives
//        repositories.mavenDeployer {
//            // Deploy to react-native-event-bridge/maven, ready to publish to npm
//            repository url: "file://${projectDir}/../android/maven"
//            configureReactNativePom pom
//        }
    }
}
