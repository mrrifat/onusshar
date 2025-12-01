cmake_minimum_required(VERSION 3.15)
project(OnussharIME VERSION 0.2.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Windows-specific settings
if(WIN32)
    add_definitions(-DUNICODE -D_UNICODE)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} /EHsc /W3 /wd4996")
    
    # Find msctf.lib from Windows SDK
    # It's typically in the Windows SDK um library directory
    find_library(MSCTF_LIBRARY msctf
        PATHS
            "$ENV{WindowsSdkDir}/Lib/$ENV{WindowsSDKVersion}/um/x64"
            "$ENV{WindowsSdkDir}/Lib/10.0.22621.0/um/x64"
            "C:/Program Files (x86)/Windows Kits/10/Lib/10.0.22621.0/um/x64"
            "C:/Program Files (x86)/Windows Kits/10/Lib/10.0.22000.0/um/x64"
            "C:/Program Files (x86)/Windows Kits/10/Lib/10.0.19041.0/um/x64"
        DOC "Path to msctf.lib (Text Services Framework library)"
    )
    
    # If not found via find_library, use the library name directly
    # CMake will use the default Windows SDK paths from the Visual Studio environment
    if(NOT MSCTF_LIBRARY)
        set(MSCTF_LIBRARY "msctf")
    endif()
endif()

# Minimal source files for initial build
set(SOURCES
    src/Common.cpp
    src/DllMain.cpp
    src/TextService-minimal.cpp
    src/ClassFactory.cpp
    OnussharIME.def
)

# Header files
set(HEADERS
    src/TextService.h
    src/ClassFactory.h
    src/Common.h
)

# Create DLL
add_library(OnussharIME SHARED ${SOURCES} ${HEADERS})

# Link libraries
target_link_libraries(OnussharIME
    PRIVATE
        ole32
        oleaut32
        uuid
        user32
        advapi32
        ${MSCTF_LIBRARY}
)

# Output directory - use default CMake location for installer compatibility
set_target_properties(OnussharIME PROPERTIES
    OUTPUT_NAME "OnussharIME"
)

# Install
install(TARGETS OnussharIME
    RUNTIME DESTINATION bin
    LIBRARY DESTINATION lib
)
