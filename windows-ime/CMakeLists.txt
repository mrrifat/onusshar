cmake_minimum_required(VERSION 3.15)
project(OnussharIME VERSION 0.2.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Windows-specific settings
if(WIN32)
    add_definitions(-DUNICODE -D_UNICODE)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} /EHsc /W3 /wd4996")
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
# Use .lib extension for Windows SDK libraries to ensure proper linking
target_link_libraries(OnussharIME
    PRIVATE
        ole32.lib
        oleaut32.lib
        uuid.lib
        user32.lib
        advapi32.lib
        msctf.lib
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
