<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInita05b754459701b8b36e41a16afe8e1b7
{
    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInita05b754459701b8b36e41a16afe8e1b7::$classMap;

        }, null, ClassLoader::class);
    }
}