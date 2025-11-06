import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Copy, RotateCcw, Eye, Settings, Maximize, Camera } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface CameraSettings {
  autoFit: boolean;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
  fov: number;
  distanceMultiplier: number;
  heightOffset: number;
  enableMouseFollow: boolean;
  mouseFollowStrength: number;
  enableFloating: boolean;
  floatingSpeed: number;
  floatingAmplitude: number;
  enableZoom: boolean;
  enablePan: boolean;
  minDistance: number;
  maxDistance: number;
}

interface CameraControlPanelProps {
  isVisible: boolean;
  onToggle: () => void;
  settings: CameraSettings;
  onSettingsChange: (settings: CameraSettings) => void;
  modelName?: string;
}

export function CameraControlPanel({
  isVisible,
  onToggle,
  settings,
  onSettingsChange,
  modelName = "Model"
}: CameraControlPanelProps) {
  const [activeTab, setActiveTab] = useState("positioning");

  const updateSetting = (key: keyof CameraSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const updateNestedSetting = (
    parentKey: 'position' | 'rotation' | 'target',
    childKey: 'x' | 'y' | 'z',
    value: number
  ) => {
    onSettingsChange({
      ...settings,
      [parentKey]: { ...settings[parentKey], [childKey]: value }
    });
  };

  const copyConfigToClipboard = () => {
    const configText = `cameraOptions: {
  autoFit: ${settings.autoFit},
  ${settings.autoFit ? 
    `distanceMultiplier: ${settings.distanceMultiplier},
  heightOffset: ${settings.heightOffset},` : 
    `position: { x: ${settings.position.x}, y: ${settings.position.y}, z: ${settings.position.z} },
  rotation: { x: ${settings.rotation.x.toFixed(3)}, y: ${settings.rotation.y.toFixed(3)}, z: ${settings.rotation.z.toFixed(3)} },
  target: { x: ${settings.target.x}, y: ${settings.target.y}, z: ${settings.target.z} },`}
  fov: ${settings.fov},
  
  // Interaction settings
  enableMouseFollow: ${settings.enableMouseFollow},
  mouseFollowStrength: ${settings.mouseFollowStrength},
  
  // Animation settings
  enableFloating: ${settings.enableFloating},
  floatingSpeed: ${settings.floatingSpeed},
  floatingAmplitude: ${settings.floatingAmplitude},
  
  // Controls
  enableZoom: ${settings.enableZoom},
  enablePan: ${settings.enablePan},
  minDistance: ${settings.minDistance},
  maxDistance: ${settings.maxDistance},
},`;

    navigator.clipboard.writeText(configText);
    toast.success("Camera configuration copied to clipboard!");
  };

  const resetToDefaults = () => {
    onSettingsChange({
      autoFit: true,
      position: { x: 0, y: 1, z: 5 },
      rotation: { x: 0, y: 0, z: 0 },
      target: { x: 0, y: 0, z: 0 },
      fov: 75,
      distanceMultiplier: 2.5,
      heightOffset: 0.1,
      enableMouseFollow: true,
      mouseFollowStrength: 0.5,
      enableFloating: true,
      floatingSpeed: 0.001,
      floatingAmplitude: 0.1,
      enableZoom: true,
      enablePan: true,
      minDistance: 1,
      maxDistance: 20,
    });
    toast.success("Reset to default settings");
  };

  const presets = {
    frontView: () => updateSetting('position', { x: 0, y: 1, z: 5 }) && updateSetting('rotation', { x: 0, y: 0, z: 0 }),
    sideView: () => updateSetting('position', { x: 5, y: 1, z: 0 }) && updateSetting('rotation', { x: 0, y: -1.57, z: 0 }),
    topView: () => updateSetting('position', { x: 0, y: 8, z: 1 }) && updateSetting('rotation', { x: -1.4, y: 0, z: 0 }),
    angleView: () => updateSetting('position', { x: 3, y: 2, z: 4 }) && updateSetting('rotation', { x: -0.3, y: 0.5, z: 0 }),
  };

  if (!isVisible) {
    return (
      <div className="fixed top-24 right-4 z-50">
        <Button onClick={onToggle} variant="outline" size="sm" className="shadow-lg">
          <Settings className="w-4 h-4 mr-2" />
          Camera Controls
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-24 right-4 z-50 w-80 max-h-[calc(100vh-200px)] overflow-y-auto">
      <Card className="shadow-2xl border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Camera className="w-4 h-4" />
              Camera Controls - {modelName}
            </CardTitle>
            <Button onClick={onToggle} variant="ghost" size="sm">
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 text-xs">
              <TabsTrigger value="positioning">Position</TabsTrigger>
              <TabsTrigger value="animation">Animation</TabsTrigger>
              <TabsTrigger value="controls">Controls</TabsTrigger>
            </TabsList>

            <TabsContent value="positioning" className="space-y-4">
              {/* Mode Toggle */}
              <div className="flex items-center justify-between">
                <Label className="text-sm">Manual Positioning</Label>
                <Switch
                  checked={!settings.autoFit}
                  onCheckedChange={(checked) => updateSetting('autoFit', !checked)}
                />
              </div>

              {/* FOV */}
              <div className="space-y-2">
                <Label className="text-sm">Field of View: {settings.fov}°</Label>
                <Slider
                  value={[settings.fov]}
                  onValueChange={([value]) => updateSetting('fov', value)}
                  min={20}
                  max={120}
                  step={5}
                  className="w-full"
                />
              </div>

              {settings.autoFit ? (
                // Auto-fit controls
                <>
                  <div className="space-y-2">
                    <Label className="text-sm">Distance: {settings.distanceMultiplier}x</Label>
                    <Slider
                      value={[settings.distanceMultiplier]}
                      onValueChange={([value]) => updateSetting('distanceMultiplier', value)}
                      min={0.5}
                      max={8}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Height Offset: {settings.heightOffset}</Label>
                    <Slider
                      value={[settings.heightOffset]}
                      onValueChange={([value]) => updateSetting('heightOffset', value)}
                      min={-1}
                      max={1}
                      step={0.05}
                      className="w-full"
                    />
                  </div>
                </>
              ) : (
                // Manual controls
                <>
                  {/* Quick Presets */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline" onClick={() => {
                      updateSetting('position', { x: 0, y: 1, z: 5 });
                      updateSetting('rotation', { x: 0, y: 0, z: 0 });
                    }}>Front</Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      updateSetting('position', { x: 5, y: 1, z: 0 });
                      updateSetting('rotation', { x: 0, y: -1.57, z: 0 });
                    }}>Side</Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      updateSetting('position', { x: 0, y: 8, z: 1 });
                      updateSetting('rotation', { x: -1.4, y: 0, z: 0 });
                    }}>Top</Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      updateSetting('position', { x: 3, y: 2, z: 4 });
                      updateSetting('rotation', { x: -0.3, y: 0.5, z: 0 });
                    }}>Angle</Button>
                  </div>

                  {/* Position */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Position</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">X</Label>
                        <Input
                          type="number"
                          value={settings.position.x}
                          onChange={(e) => updateNestedSetting('position', 'x', parseFloat(e.target.value) || 0)}
                          step={0.1}
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Y</Label>
                        <Input
                          type="number"
                          value={settings.position.y}
                          onChange={(e) => updateNestedSetting('position', 'y', parseFloat(e.target.value) || 0)}
                          step={0.1}
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Z</Label>
                        <Input
                          type="number"
                          value={settings.position.z}
                          onChange={(e) => updateNestedSetting('position', 'z', parseFloat(e.target.value) || 0)}
                          step={0.1}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rotation */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Rotation (radians)</Label>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs">X (pitch): {settings.rotation.x.toFixed(3)}</Label>
                        <Slider
                          value={[settings.rotation.x]}
                          onValueChange={([value]) => updateNestedSetting('rotation', 'x', value)}
                          min={-Math.PI}
                          max={Math.PI}
                          step={0.01}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Y (yaw): {settings.rotation.y.toFixed(3)}</Label>
                        <Slider
                          value={[settings.rotation.y]}
                          onValueChange={([value]) => updateNestedSetting('rotation', 'y', value)}
                          min={-Math.PI}
                          max={Math.PI}
                          step={0.01}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Z (roll): {settings.rotation.z.toFixed(3)}</Label>
                        <Slider
                          value={[settings.rotation.z]}
                          onValueChange={([value]) => updateNestedSetting('rotation', 'z', value)}
                          min={-Math.PI}
                          max={Math.PI}
                          step={0.01}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Target */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Look-At Target</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">X</Label>
                        <Input
                          type="number"
                          value={settings.target.x}
                          onChange={(e) => updateNestedSetting('target', 'x', parseFloat(e.target.value) || 0)}
                          step={0.1}
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Y</Label>
                        <Input
                          type="number"
                          value={settings.target.y}
                          onChange={(e) => updateNestedSetting('target', 'y', parseFloat(e.target.value) || 0)}
                          step={0.1}
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Z</Label>
                        <Input
                          type="number"
                          value={settings.target.z}
                          onChange={(e) => updateNestedSetting('target', 'z', parseFloat(e.target.value) || 0)}
                          step={0.1}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="animation" className="space-y-4">
              {/* Mouse Follow */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Mouse Follow</Label>
                  <Switch
                    checked={settings.enableMouseFollow}
                    onCheckedChange={(checked) => updateSetting('enableMouseFollow', checked)}
                  />
                </div>
                {settings.enableMouseFollow && (
                  <div>
                    <Label className="text-xs">Strength: {settings.mouseFollowStrength}</Label>
                    <Slider
                      value={[settings.mouseFollowStrength]}
                      onValueChange={([value]) => updateSetting('mouseFollowStrength', value)}
                      min={0}
                      max={1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              {/* Floating Animation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Floating Animation</Label>
                  <Switch
                    checked={settings.enableFloating}
                    onCheckedChange={(checked) => updateSetting('enableFloating', checked)}
                  />
                </div>
                {settings.enableFloating && (
                  <>
                    <div>
                      <Label className="text-xs">Speed: {settings.floatingSpeed}</Label>
                      <Slider
                        value={[settings.floatingSpeed]}
                        onValueChange={([value]) => updateSetting('floatingSpeed', value)}
                        min={0.0001}
                        max={0.01}
                        step={0.0001}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Amplitude: {settings.floatingAmplitude}</Label>
                      <Slider
                        value={[settings.floatingAmplitude]}
                        onValueChange={([value]) => updateSetting('floatingAmplitude', value)}
                        min={0}
                        max={0.5}
                        step={0.01}
                        className="w-full"
                      />
                    </div>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="controls" className="space-y-4">
              {/* Zoom */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Zoom Controls</Label>
                  <Switch
                    checked={settings.enableZoom}
                    onCheckedChange={(checked) => updateSetting('enableZoom', checked)}
                  />
                </div>
                {settings.enableZoom && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Min Distance</Label>
                      <Input
                        type="number"
                        value={settings.minDistance}
                        onChange={(e) => updateSetting('minDistance', parseFloat(e.target.value) || 1)}
                        step={0.1}
                        className="text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Max Distance</Label>
                      <Input
                        type="number"
                        value={settings.maxDistance}
                        onChange={(e) => updateSetting('maxDistance', parseFloat(e.target.value) || 20)}
                        step={0.1}
                        className="text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Pan */}
              <div className="flex items-center justify-between">
                <Label className="text-sm">Pan Controls</Label>
                <Switch
                  checked={settings.enablePan}
                  onCheckedChange={(checked) => updateSetting('enablePan', checked)}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <Button size="sm" onClick={copyConfigToClipboard} className="flex-1">
              <Copy className="w-3 h-3 mr-1" />
              Copy Config
            </Button>
            <Button size="sm" variant="outline" onClick={resetToDefaults}>
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>

          {/* Live Values Display */}
          <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded">
            <div className="font-mono">
              Pos: ({settings.position.x.toFixed(1)}, {settings.position.y.toFixed(1)}, {settings.position.z.toFixed(1)})
            </div>
            <div className="font-mono">
              Rot: ({settings.rotation.x.toFixed(2)}, {settings.rotation.y.toFixed(2)}, {settings.rotation.z.toFixed(2)})
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}