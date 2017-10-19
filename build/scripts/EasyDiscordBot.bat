@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  EasyDiscordBot startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Add default JVM options here. You can also use JAVA_OPTS and EASY_DISCORD_BOT_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto init

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto init

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:init
@rem Get command-line arguments, handling Windows variants

if not "%OS%" == "Windows_NT" goto win9xME_args

:win9xME_args
@rem Slurp the command line arguments.
set CMD_LINE_ARGS=
set _SKIP=2

:win9xME_args_slurp
if "x%~1" == "x" goto execute

set CMD_LINE_ARGS=%*

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\EasyDiscordBot-1.0-SNAPSHOT.jar;%APP_HOME%\lib\purplejs-boot-0.8.0.jar;%APP_HOME%\lib\purplejs-thymeleaf-0.8.0.jar;%APP_HOME%\lib\orientdb-core-2.0.8.jar;%APP_HOME%\lib\orientdb-jdbc-2.0.8.jar;%APP_HOME%\lib\json-20090211.jar;%APP_HOME%\lib\purplejs-http-0.8.0.jar;%APP_HOME%\lib\purplejs-router-0.8.0.jar;%APP_HOME%\lib\jetty-servlet-9.3.10.v20160621.jar;%APP_HOME%\lib\websocket-server-9.3.10.v20160621.jar;%APP_HOME%\lib\logback-classic-1.1.7.jar;%APP_HOME%\lib\jul-to-slf4j-1.7.21.jar;%APP_HOME%\lib\purplejs-core-0.8.0.jar;%APP_HOME%\lib\thymeleaf-3.0.2.RELEASE.jar;%APP_HOME%\lib\snappy-java-1.1.0.1.jar;%APP_HOME%\lib\concurrentlinkedhashmap-lru-1.4.1.jar;%APP_HOME%\lib\jna-4.0.0.jar;%APP_HOME%\lib\jna-platform-4.0.0.jar;%APP_HOME%\lib\orientdb-graphdb-2.0.8.jar;%APP_HOME%\lib\orientdb-client-2.0.8.jar;%APP_HOME%\lib\jetty-security-9.3.10.v20160621.jar;%APP_HOME%\lib\websocket-common-9.3.10.v20160621.jar;%APP_HOME%\lib\websocket-client-9.3.10.v20160621.jar;%APP_HOME%\lib\websocket-servlet-9.3.10.v20160621.jar;%APP_HOME%\lib\jetty-http-9.3.10.v20160621.jar;%APP_HOME%\lib\logback-core-1.1.7.jar;%APP_HOME%\lib\guava-19.0.jar;%APP_HOME%\lib\gson-2.7.jar;%APP_HOME%\lib\ognl-3.1.10.jar;%APP_HOME%\lib\attoparser-2.0.1.RELEASE.jar;%APP_HOME%\lib\unbescape-1.1.4.RELEASE.jar;%APP_HOME%\lib\orientdb-server-2.0.8.jar;%APP_HOME%\lib\orientdb-tools-2.0.8.jar;%APP_HOME%\lib\blueprints-core-2.6.0.jar;%APP_HOME%\lib\gremlin-java-2.6.0.jar;%APP_HOME%\lib\gremlin-groovy-2.6.0.jar;%APP_HOME%\lib\orientdb-enterprise-2.0.8.jar;%APP_HOME%\lib\jetty-server-9.3.10.v20160621.jar;%APP_HOME%\lib\websocket-api-9.3.10.v20160621.jar;%APP_HOME%\lib\jetty-util-9.3.10.v20160621.jar;%APP_HOME%\lib\jetty-io-9.3.10.v20160621.jar;%APP_HOME%\lib\javax.servlet-api-3.1.0.jar;%APP_HOME%\lib\javassist-3.20.0-GA.jar;%APP_HOME%\lib\mail-1.4.jar;%APP_HOME%\lib\orientdb-object-2.0.8.jar;%APP_HOME%\lib\jettison-1.3.3.jar;%APP_HOME%\lib\jackson-databind-2.2.3.jar;%APP_HOME%\lib\hppc-0.6.0.jar;%APP_HOME%\lib\commons-configuration-1.6.jar;%APP_HOME%\lib\commons-logging-1.1.1.jar;%APP_HOME%\lib\pipes-2.6.0.jar;%APP_HOME%\lib\ivy-2.3.0.jar;%APP_HOME%\lib\groovy-1.8.9.jar;%APP_HOME%\lib\ant-1.8.3.jar;%APP_HOME%\lib\jansi-1.5.jar;%APP_HOME%\lib\jline-0.9.94.jar;%APP_HOME%\lib\activation-1.1.jar;%APP_HOME%\lib\hibernate-jpa-2.0-api-1.0.0.Final.jar;%APP_HOME%\lib\stax-api-1.0.1.jar;%APP_HOME%\lib\jackson-annotations-2.2.3.jar;%APP_HOME%\lib\jackson-core-2.2.3.jar;%APP_HOME%\lib\commons-collections-3.2.1.jar;%APP_HOME%\lib\commons-lang-2.4.jar;%APP_HOME%\lib\commons-digester-1.8.jar;%APP_HOME%\lib\commons-beanutils-core-1.8.0.jar;%APP_HOME%\lib\antlr-2.7.7.jar;%APP_HOME%\lib\asm-3.2.jar;%APP_HOME%\lib\asm-commons-3.2.jar;%APP_HOME%\lib\asm-util-3.2.jar;%APP_HOME%\lib\asm-analysis-3.2.jar;%APP_HOME%\lib\asm-tree-3.2.jar;%APP_HOME%\lib\ant-launcher-1.8.3.jar;%APP_HOME%\lib\commons-beanutils-1.7.0.jar;%APP_HOME%\lib\slf4j-api-1.7.21.jar

@rem Execute EasyDiscordBot
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %EASY_DISCORD_BOT_OPTS%  -classpath "%CLASSPATH%" io.purplejs.boot.MainApp %CMD_LINE_ARGS%

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable EASY_DISCORD_BOT_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%EASY_DISCORD_BOT_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
