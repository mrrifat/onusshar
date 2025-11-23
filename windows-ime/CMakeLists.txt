cmake_minimum_required(VERSION 3.15)
project(OnussharIME VERSION 0.2.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Windows-specific settings
if(WIN32)
    add_definitions(-DUNICODE -D_UNICODE)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} /EHsc /W4")
endif()

# Source files
set(SOURCES
    src/DllMain.cpp
    src/TextService.cpp
    src/ClassFactory.cpp
    src/CompositionManager.cpp
    src/CandidateWindow.cpp
    src/KeyHandler.cpp
    src/EngineProxy.cpp
)

# Header files
set(HEADERS
    src/TextService.h
    src/ClassFactory.h
    src/CompositionManager.h
    src/CandidateWindow.h
    src/KeyHandler.h
    src/EngineProxy.h
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
)

# Output directory
set_target_properties(OnussharIME PROPERTIES
    OUTPUT_NAME "OnussharIME"
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin"
)

# Install
install(TARGETS OnussharIME
    RUNTIME DESTINATION bin
    LIBRARY DESTINATION lib
)
