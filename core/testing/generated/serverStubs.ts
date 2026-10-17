// このファイルは scripts/gen-testing-stubs.mjs が生成する。手で編集しないこと。
// 生成元: @minecraft/server 2.8.0
import { notImplemented } from '../runtime';

export const STUB_SOURCE_VERSION = '2.8.0';

export const AimAssistTargetMode = Object.freeze({
  Angle: 'Angle',
  Distance: 'Distance',
} as const);
export const BlockComponentTypes = Object.freeze({
  FluidContainer: 'minecraft:fluid_container',
  Inventory: 'minecraft:inventory',
  MapColor: 'minecraft:map_color',
  Movable: 'minecraft:movable',
  Piston: 'minecraft:piston',
  PrecipitationInteractions: 'minecraft:precipitation_interactions',
  RecordPlayer: 'minecraft:record_player',
  RedstoneProducer: 'minecraft:redstone_producer',
  Sign: 'minecraft:sign',
} as const);
export const BlockPistonState = Object.freeze({
  Expanded: 'Expanded',
  Expanding: 'Expanding',
  Retracted: 'Retracted',
  Retracting: 'Retracting',
} as const);
export const BlockVolumeIntersection = Object.freeze({
  Disjoint: 0,
  Contains: 1,
  Intersects: 2,
} as const);
export const BookErrorReason = Object.freeze({
  ExceedsMaxPageLength: 'ExceedsMaxPageLength',
  ExceedsMaxPages: 'ExceedsMaxPages',
  ExceedsTitleLength: 'ExceedsTitleLength',
} as const);
export const ButtonState = Object.freeze({
  Pressed: 'Pressed',
  Released: 'Released',
} as const);
export const CommandPermissionLevel = Object.freeze({
  Any: 0,
  GameDirectors: 1,
  Admin: 2,
  Host: 3,
  Owner: 4,
} as const);
export const ContainerRulesErrorReason = Object.freeze({
  BannedItem: 'BannedItem',
  NestedStorageItem: 'NestedStorageItem',
  NotAllowedItem: 'NotAllowedItem',
  OverWeightLimit: 'OverWeightLimit',
  ZeroWeightItem: 'ZeroWeightItem',
} as const);
export const ControlScheme = Object.freeze({
  CameraRelative: 'CameraRelative',
  CameraRelativeStrafe: 'CameraRelativeStrafe',
  LockedPlayerRelativeStrafe: 'LockedPlayerRelativeStrafe',
  PlayerRelative: 'PlayerRelative',
  PlayerRelativeStrafe: 'PlayerRelativeStrafe',
} as const);
export const CustomCommandErrorReason = Object.freeze({
  AlreadyRegistered: 'AlreadyRegistered',
  EnumDependencyMissing: 'EnumDependencyMissing',
  NamespaceMismatch: 'NamespaceMismatch',
  ParameterLimit: 'ParameterLimit',
  RegistryInvalid: 'RegistryInvalid',
  RegistryReadOnly: 'RegistryReadOnly',
} as const);
export const CustomCommandParamType = Object.freeze({
  BlockType: 'BlockType',
  Boolean: 'Boolean',
  EntitySelector: 'EntitySelector',
  EntityType: 'EntityType',
  Enum: 'Enum',
  Float: 'Float',
  Integer: 'Integer',
  ItemType: 'ItemType',
  Location: 'Location',
  PlayerSelector: 'PlayerSelector',
  String: 'String',
} as const);
export const CustomCommandSource = Object.freeze({
  Block: 'Block',
  Entity: 'Entity',
  NPCDialogue: 'NPCDialogue',
  Server: 'Server',
} as const);
export const CustomCommandStatus = Object.freeze({
  Success: 0,
  Failure: 1,
} as const);
export const CustomComponentNameErrorReason = Object.freeze({
  NoNamespace: 1,
  DisallowedNamespace: 2,
} as const);
export const Difficulty = Object.freeze({
  Easy: 'Easy',
  Hard: 'Hard',
  Normal: 'Normal',
  Peaceful: 'Peaceful',
} as const);
export const Direction = Object.freeze({
  Down: 'Down',
  East: 'East',
  North: 'North',
  South: 'South',
  Up: 'Up',
  West: 'West',
} as const);
export const DisplaySlotId = Object.freeze({
  BelowName: 'BelowName',
  List: 'List',
  Sidebar: 'Sidebar',
} as const);
export const DyeColor = Object.freeze({
  Black: 'Black',
  Blue: 'Blue',
  Brown: 'Brown',
  Cyan: 'Cyan',
  Gray: 'Gray',
  Green: 'Green',
  LightBlue: 'LightBlue',
  Lime: 'Lime',
  Magenta: 'Magenta',
  Orange: 'Orange',
  Pink: 'Pink',
  Purple: 'Purple',
  Red: 'Red',
  Silver: 'Silver',
  White: 'White',
  Yellow: 'Yellow',
} as const);
export const EasingType = Object.freeze({
  InBack: 'InBack',
  InBounce: 'InBounce',
  InCirc: 'InCirc',
  InCubic: 'InCubic',
  InElastic: 'InElastic',
  InExpo: 'InExpo',
  InOutBack: 'InOutBack',
  InOutBounce: 'InOutBounce',
  InOutCirc: 'InOutCirc',
  InOutCubic: 'InOutCubic',
  InOutElastic: 'InOutElastic',
  InOutExpo: 'InOutExpo',
  InOutQuad: 'InOutQuad',
  InOutQuart: 'InOutQuart',
  InOutQuint: 'InOutQuint',
  InOutSine: 'InOutSine',
  InQuad: 'InQuad',
  InQuart: 'InQuart',
  InQuint: 'InQuint',
  InSine: 'InSine',
  Linear: 'Linear',
  OutBack: 'OutBack',
  OutBounce: 'OutBounce',
  OutCirc: 'OutCirc',
  OutCubic: 'OutCubic',
  OutElastic: 'OutElastic',
  OutExpo: 'OutExpo',
  OutQuad: 'OutQuad',
  OutQuart: 'OutQuart',
  OutQuint: 'OutQuint',
  OutSine: 'OutSine',
  Spring: 'Spring',
} as const);
export const EnchantmentSlot = Object.freeze({
  ArmorFeet: 'ArmorFeet',
  ArmorHead: 'ArmorHead',
  ArmorLegs: 'ArmorLegs',
  ArmorTorso: 'ArmorTorso',
  Axe: 'Axe',
  Bow: 'Bow',
  CarrotStick: 'CarrotStick',
  CosmeticHead: 'CosmeticHead',
  Crossbow: 'Crossbow',
  Elytra: 'Elytra',
  FishingRod: 'FishingRod',
  Flintsteel: 'Flintsteel',
  Hoe: 'Hoe',
  MeleeSpear: 'MeleeSpear',
  Pickaxe: 'Pickaxe',
  Shears: 'Shears',
  Shield: 'Shield',
  Shovel: 'Shovel',
  Spear: 'Spear',
  Sword: 'Sword',
} as const);
export const EntityAttachPoint = Object.freeze({
  Body: 'Body',
  BreathingPoint: 'BreathingPoint',
  DropAttachPoint: 'DropAttachPoint',
  ExplosionPoint: 'ExplosionPoint',
  Eyes: 'Eyes',
  Feet: 'Feet',
  Head: 'Head',
  Mouth: 'Mouth',
  WeaponAttachPoint: 'WeaponAttachPoint',
} as const);
export const EntityComponentTypes = Object.freeze({
  AddRider: 'minecraft:addrider',
  Ageable: 'minecraft:ageable',
  Breathable: 'minecraft:breathable',
  CanClimb: 'minecraft:can_climb',
  CanFly: 'minecraft:can_fly',
  CanPowerJump: 'minecraft:can_power_jump',
  Color: 'minecraft:color',
  Color2: 'minecraft:color2',
  CursorInventory: 'minecraft:cursor_inventory',
  EnderInventory: 'minecraft:ender_inventory',
  Equippable: 'minecraft:equippable',
  FireImmune: 'minecraft:fire_immune',
  FloatsInLiquid: 'minecraft:floats_in_liquid',
  FlyingSpeed: 'minecraft:flying_speed',
  FrictionModifier: 'minecraft:friction_modifier',
  Healable: 'minecraft:healable',
  Health: 'minecraft:health',
  Inventory: 'minecraft:inventory',
  IsBaby: 'minecraft:is_baby',
  IsCharged: 'minecraft:is_charged',
  IsChested: 'minecraft:is_chested',
  IsDyeable: 'minecraft:is_dyeable',
  IsHiddenWhenInvisible: 'minecraft:is_hidden_when_invisible',
  IsIgnited: 'minecraft:is_ignited',
  IsIllagerCaptain: 'minecraft:is_illager_captain',
  IsSaddled: 'minecraft:is_saddled',
  IsShaking: 'minecraft:is_shaking',
  IsSheared: 'minecraft:is_sheared',
  IsStackable: 'minecraft:is_stackable',
  IsStunned: 'minecraft:is_stunned',
  IsTamed: 'minecraft:is_tamed',
  Item: 'minecraft:item',
  LavaMovement: 'minecraft:lava_movement',
  Leashable: 'minecraft:leashable',
  MarkVariant: 'minecraft:mark_variant',
  Movement: 'minecraft:movement',
  MovementAmphibious: 'minecraft:movement.amphibious',
  MovementBasic: 'minecraft:movement.basic',
  MovementFly: 'minecraft:movement.fly',
  MovementGeneric: 'minecraft:movement.generic',
  MovementGlide: 'minecraft:movement.glide',
  MovementHover: 'minecraft:movement.hover',
  MovementJump: 'minecraft:movement.jump',
  MovementSkip: 'minecraft:movement.skip',
  MovementSway: 'minecraft:movement.sway',
  NavigationClimb: 'minecraft:navigation.climb',
  NavigationFloat: 'minecraft:navigation.float',
  NavigationFly: 'minecraft:navigation.fly',
  NavigationGeneric: 'minecraft:navigation.generic',
  NavigationHover: 'minecraft:navigation.hover',
  NavigationWalk: 'minecraft:navigation.walk',
  OnFire: 'minecraft:onfire',
  Exhaustion: 'minecraft:player.exhaustion',
  Hunger: 'minecraft:player.hunger',
  Saturation: 'minecraft:player.saturation',
  Projectile: 'minecraft:projectile',
  PushThrough: 'minecraft:push_through',
  Rideable: 'minecraft:rideable',
  Riding: 'minecraft:riding',
  Scale: 'minecraft:scale',
  SkinId: 'minecraft:skin_id',
  Strength: 'minecraft:strength',
  Tameable: 'minecraft:tameable',
  TameMount: 'minecraft:tamemount',
  TypeFamily: 'minecraft:type_family',
  UnderwaterMovement: 'minecraft:underwater_movement',
  Variant: 'minecraft:variant',
  WantsJockey: 'minecraft:wants_jockey',
} as const);
export const EntityDamageCause = Object.freeze({
  anvil: 'anvil',
  blockExplosion: 'blockExplosion',
  campfire: 'campfire',
  charging: 'charging',
  contact: 'contact',
  drowning: 'drowning',
  entityAttack: 'entityAttack',
  entityExplosion: 'entityExplosion',
  fall: 'fall',
  fallingBlock: 'fallingBlock',
  fire: 'fire',
  fireTick: 'fireTick',
  fireworks: 'fireworks',
  flyIntoWall: 'flyIntoWall',
  freezing: 'freezing',
  lava: 'lava',
  lightning: 'lightning',
  maceSmash: 'maceSmash',
  magic: 'magic',
  magma: 'magma',
  none: 'none',
  override: 'override',
  piston: 'piston',
  projectile: 'projectile',
  ramAttack: 'ramAttack',
  selfDestruct: 'selfDestruct',
  sonicBoom: 'sonicBoom',
  soulCampfire: 'soulCampfire',
  stalactite: 'stalactite',
  stalagmite: 'stalagmite',
  starve: 'starve',
  suffocation: 'suffocation',
  temperature: 'temperature',
  thorns: 'thorns',
  wither: 'wither',
} as const);
export const EntityHealCause = Object.freeze({
  Heal: 'Heal',
  Regeneration: 'Regeneration',
  SelfHeal: 'SelfHeal',
  TotemOfUndying: 'TotemOfUndying',
} as const);
export const EntityInitializationCause = Object.freeze({
  Born: 'Born',
  Event: 'Event',
  Loaded: 'Loaded',
  Spawned: 'Spawned',
  Transformed: 'Transformed',
} as const);
export const EntitySwingSource = Object.freeze({
  Attack: 'Attack',
  Build: 'Build',
  DropItem: 'DropItem',
  Event: 'Event',
  Interact: 'Interact',
  Mine: 'Mine',
  None: 'None',
  ThrowItem: 'ThrowItem',
  UseItem: 'UseItem',
} as const);
export const EquipmentSlot = Object.freeze({
  Chest: 'Chest',
  Feet: 'Feet',
  Head: 'Head',
  Legs: 'Legs',
  Mainhand: 'Mainhand',
  Offhand: 'Offhand',
} as const);
export const FluidType = Object.freeze({
  Lava: 'Lava',
  Potion: 'Potion',
  PowderSnow: 'PowderSnow',
  Water: 'Water',
} as const);
export const GameMode = Object.freeze({
  Adventure: 'Adventure',
  Creative: 'Creative',
  Spectator: 'Spectator',
  Survival: 'Survival',
} as const);
export const GameRule = Object.freeze({
  CommandBlockOutput: 'commandBlockOutput',
  CommandBlocksEnabled: 'commandBlocksEnabled',
  DoDayLightCycle: 'doDayLightCycle',
  DoEntityDrops: 'doEntityDrops',
  DoFireTick: 'doFireTick',
  DoImmediateRespawn: 'doImmediateRespawn',
  DoInsomnia: 'doInsomnia',
  DoLimitedCrafting: 'doLimitedCrafting',
  DoMobLoot: 'doMobLoot',
  DoMobSpawning: 'doMobSpawning',
  DoTileDrops: 'doTileDrops',
  DoWeatherCycle: 'doWeatherCycle',
  DrowningDamage: 'drowningDamage',
  FallDamage: 'fallDamage',
  FireDamage: 'fireDamage',
  FreezeDamage: 'freezeDamage',
  FunctionCommandLimit: 'functionCommandLimit',
  KeepInventory: 'keepInventory',
  MaxCommandChainLength: 'maxCommandChainLength',
  MobGriefing: 'mobGriefing',
  NaturalRegeneration: 'naturalRegeneration',
  PlayersSleepingPercentage: 'playersSleepingPercentage',
  ProjectilesCanBreakBlocks: 'projectilesCanBreakBlocks',
  Pvp: 'pvp',
  RandomTickSpeed: 'randomTickSpeed',
  RecipesUnlock: 'recipesUnlock',
  RespawnBlocksExplode: 'respawnBlocksExplode',
  SendCommandFeedback: 'sendCommandFeedback',
  ShowBorderEffect: 'showBorderEffect',
  ShowCoordinates: 'showCoordinates',
  ShowDaysPlayed: 'showDaysPlayed',
  ShowDeathMessages: 'showDeathMessages',
  ShowRecipeMessages: 'showRecipeMessages',
  ShowTags: 'showTags',
  SpawnRadius: 'spawnRadius',
  TntExplodes: 'tntExplodes',
  TntExplosionDropDecay: 'tntExplosionDropDecay',
} as const);
export const GraphicsMode = Object.freeze({
  Deferred: 'Deferred',
  Fancy: 'Fancy',
  RayTraced: 'RayTraced',
  Simple: 'Simple',
} as const);
export const HeldItemOption = Object.freeze({
  AnyItem: 'AnyItem',
  NoItem: 'NoItem',
} as const);
export const HudElement = Object.freeze({
  PaperDoll: 0,
  Armor: 1,
  ToolTips: 2,
  TouchControls: 3,
  Crosshair: 4,
  Hotbar: 5,
  Health: 6,
  ProgressBar: 7,
  Hunger: 8,
  AirBubbles: 9,
  HorseHealth: 10,
  StatusEffects: 11,
  ItemText: 12,
} as const);
export const HudVisibility = Object.freeze({
  Hide: 0,
  Reset: 1,
} as const);
export const InputButton = Object.freeze({
  Jump: 'Jump',
  Sneak: 'Sneak',
} as const);
export const InputMode = Object.freeze({
  Gamepad: 'Gamepad',
  KeyboardAndMouse: 'KeyboardAndMouse',
  MotionController: 'MotionController',
  Touch: 'Touch',
} as const);
export const InputPermissionCategory = Object.freeze({
  Camera: 1,
  Movement: 2,
  LateralMovement: 4,
  Sneak: 5,
  Jump: 6,
  Mount: 7,
  Dismount: 8,
  MoveForward: 9,
  MoveBackward: 10,
  MoveLeft: 11,
  MoveRight: 12,
} as const);
export const ItemComponentTypes = Object.freeze({
  Book: 'minecraft:book',
  Compostable: 'minecraft:compostable',
  Cooldown: 'minecraft:cooldown',
  Durability: 'minecraft:durability',
  Dyeable: 'minecraft:dyeable',
  Enchantable: 'minecraft:enchantable',
  Food: 'minecraft:food',
  Inventory: 'minecraft:inventory',
  Potion: 'minecraft:potion',
} as const);
export const ItemLockMode = Object.freeze({
  inventory: 'inventory',
  none: 'none',
  slot: 'slot',
} as const);
export const LiquidSettings = Object.freeze({
  ApplyWaterlogging: 'ApplyWaterlogging',
  IgnoreWaterlogging: 'IgnoreWaterlogging',
} as const);
export const LiquidType = Object.freeze({
  Water: 'Water',
} as const);
export const LocatorBarErrorReason = Object.freeze({
  WaypointAlreadyExists: 'WaypointAlreadyExists',
  WaypointLimitExceeded: 'WaypointLimitExceeded',
  WaypointNotFound: 'WaypointNotFound',
} as const);
export const MemoryTier = Object.freeze({
  SuperLow: 0,
  Low: 1,
  Mid: 2,
  High: 3,
  SuperHigh: 4,
} as const);
export const MoonPhase = Object.freeze({
  FullMoon: 0,
  WaningGibbous: 1,
  FirstQuarter: 2,
  WaningCrescent: 3,
  NewMoon: 4,
  WaxingCrescent: 5,
  LastQuarter: 6,
  WaxingGibbous: 7,
} as const);
export const MovementType = Object.freeze({
  Immovable: 'Immovable',
  Popped: 'Popped',
  Push: 'Push',
  PushPull: 'PushPull',
} as const);
export const NamespaceNameErrorReason = Object.freeze({
  DisallowedNamespace: 'DisallowedNamespace',
  NoNamespace: 'NoNamespace',
} as const);
export const ObjectiveSortOrder = Object.freeze({
  Ascending: 0,
  Descending: 1,
} as const);
export const PaletteColor = Object.freeze({
  White: 0,
  Orange: 1,
  Magenta: 2,
  LightBlue: 3,
  Yellow: 4,
  Lime: 5,
  Pink: 6,
  Gray: 7,
  Silver: 8,
  Cyan: 9,
  Purple: 10,
  Blue: 11,
  Brown: 12,
  Green: 13,
  Red: 14,
  Black: 15,
} as const);
export const PlatformType = Object.freeze({
  Console: 'Console',
  Desktop: 'Desktop',
  Mobile: 'Mobile',
} as const);
export const PlayerInventoryType = Object.freeze({
  Hotbar: 'Hotbar',
  Inventory: 'Inventory',
} as const);
export const PlayerPermissionLevel = Object.freeze({
  Visitor: 0,
  Member: 1,
  Operator: 2,
  Custom: 3,
} as const);
export const ScoreboardIdentityType = Object.freeze({
  Entity: 'Entity',
  FakePlayer: 'FakePlayer',
  Player: 'Player',
} as const);
export const ScriptEventSource = Object.freeze({
  Block: 'Block',
  Entity: 'Entity',
  NPCDialogue: 'NPCDialogue',
  Server: 'Server',
} as const);
export const SignSide = Object.freeze({
  Back: 'Back',
  Front: 'Front',
} as const);
export const StickyType = Object.freeze({
  None: 'None',
  Same: 'Same',
} as const);
export const StructureAnimationMode = Object.freeze({
  Blocks: 'Blocks',
  Layers: 'Layers',
  None: 'None',
} as const);
export const StructureMirrorAxis = Object.freeze({
  None: 'None',
  X: 'X',
  XZ: 'XZ',
  Z: 'Z',
} as const);
export const StructureRotation = Object.freeze({
  None: 'None',
  Rotate180: 'Rotate180',
  Rotate270: 'Rotate270',
  Rotate90: 'Rotate90',
} as const);
export const StructureSaveMode = Object.freeze({
  Memory: 'Memory',
  World: 'World',
} as const);
export const TickingAreaErrorReason = Object.freeze({
  IdentifierAlreadyExists: 'IdentifierAlreadyExists',
  OverChunkLimit: 'OverChunkLimit',
  SideLengthExceeded: 'SideLengthExceeded',
  UnknownIdentifier: 'UnknownIdentifier',
} as const);
export const TimeOfDay = Object.freeze({
  Day: 1000,
  Noon: 6000,
  Sunset: 12000,
  Night: 13000,
  Midnight: 18000,
  Sunrise: 23000,
} as const);
export const TintMethod = Object.freeze({
  BirchFoliage: 'BirchFoliage',
  DefaultFoliage: 'DefaultFoliage',
  DryFoliage: 'DryFoliage',
  EvergreenFoliage: 'EvergreenFoliage',
  Grass: 'Grass',
  None: 'None',
  Water: 'Water',
} as const);
export const WaypointTexture = Object.freeze({
  Circle: 'minecraft:circle',
  SmallSquare: 'minecraft:small_square',
  SmallStar: 'minecraft:small_star',
  Square: 'minecraft:square',
} as const);
export const WeatherType = Object.freeze({
  Clear: 'Clear',
  Rain: 'Rain',
  Thunder: 'Thunder',
} as const);

export const HudElementsCount = 13;
export const HudVisibilityCount = 2;
export const MoonPhaseCount = 8;
export const TicksPerDay = 24000;
export const TicksPerSecond = 20;

/** 模擬環境で未実装のクラス。参照（instanceof や static 参照）はできるが、生成すると分かりやすいエラーを投げる。 */
const stubClass = (name: string) => class {
  constructor() {
    notImplemented(`@minecraft/server の ${name}`);
  }
};
export const AimAssistCategory = stubClass('AimAssistCategory');
export const AimAssistCategorySettings = stubClass('AimAssistCategorySettings');
export const AimAssistPreset = stubClass('AimAssistPreset');
export const AimAssistPresetSettings = stubClass('AimAssistPresetSettings');
export const AimAssistRegistry = stubClass('AimAssistRegistry');
export const BiomeType = stubClass('BiomeType');
export const BiomeTypes = stubClass('BiomeTypes');
export const Block = stubClass('Block');
export const BlockComponent = stubClass('BlockComponent');
export const BlockComponentBlockBreakEvent = stubClass('BlockComponentBlockBreakEvent');
export const BlockComponentBlockStateChangeEvent = stubClass('BlockComponentBlockStateChangeEvent');
export const BlockComponentEntityEvent = stubClass('BlockComponentEntityEvent');
export const BlockComponentEntityFallOnEvent = stubClass('BlockComponentEntityFallOnEvent');
export const BlockComponentOnPlaceEvent = stubClass('BlockComponentOnPlaceEvent');
export const BlockComponentPlayerBreakEvent = stubClass('BlockComponentPlayerBreakEvent');
export const BlockComponentPlayerInteractEvent = stubClass('BlockComponentPlayerInteractEvent');
export const BlockComponentPlayerPlaceBeforeEvent = stubClass('BlockComponentPlayerPlaceBeforeEvent');
export const BlockComponentRandomTickEvent = stubClass('BlockComponentRandomTickEvent');
export const BlockComponentRedstoneUpdateEvent = stubClass('BlockComponentRedstoneUpdateEvent');
export const BlockComponentRegistry = stubClass('BlockComponentRegistry');
export const BlockComponentStepOffEvent = stubClass('BlockComponentStepOffEvent');
export const BlockComponentStepOnEvent = stubClass('BlockComponentStepOnEvent');
export const BlockComponentTickEvent = stubClass('BlockComponentTickEvent');
export const BlockContainerClosedAfterEvent = stubClass('BlockContainerClosedAfterEvent');
export const BlockContainerClosedAfterEventSignal = stubClass('BlockContainerClosedAfterEventSignal');
export const BlockContainerOpenedAfterEvent = stubClass('BlockContainerOpenedAfterEvent');
export const BlockContainerOpenedAfterEventSignal = stubClass('BlockContainerOpenedAfterEventSignal');
export const BlockCustomComponentInstance = stubClass('BlockCustomComponentInstance');
export const BlockEvent = stubClass('BlockEvent');
export const BlockExplodeAfterEvent = stubClass('BlockExplodeAfterEvent');
export const BlockExplodeAfterEventSignal = stubClass('BlockExplodeAfterEventSignal');
export const BlockFluidContainerComponent = stubClass('BlockFluidContainerComponent');
export const BlockInventoryComponent = stubClass('BlockInventoryComponent');
export const BlockLocationIterator = stubClass('BlockLocationIterator');
export const BlockMapColorComponent = stubClass('BlockMapColorComponent');
export const BlockMovableComponent = stubClass('BlockMovableComponent');
export const BlockPermutation = stubClass('BlockPermutation');
export const BlockPistonComponent = stubClass('BlockPistonComponent');
export const BlockPrecipitationInteractionsComponent = stubClass('BlockPrecipitationInteractionsComponent');
export const BlockRecordPlayerComponent = stubClass('BlockRecordPlayerComponent');
export const BlockRedstoneProducerComponent = stubClass('BlockRedstoneProducerComponent');
export const BlockSignComponent = stubClass('BlockSignComponent');
export const BlockStates = stubClass('BlockStates');
export const BlockStateType = stubClass('BlockStateType');
export const BlockType = stubClass('BlockType');
export const BlockTypes = stubClass('BlockTypes');
export const BlockVolume = stubClass('BlockVolume');
export const BlockVolumeBase = stubClass('BlockVolumeBase');
export const ButtonPushAfterEvent = stubClass('ButtonPushAfterEvent');
export const ButtonPushAfterEventSignal = stubClass('ButtonPushAfterEventSignal');
export const Camera = stubClass('Camera');
export const CatmullRomSpline = stubClass('CatmullRomSpline');
export const ClientSystemInfo = stubClass('ClientSystemInfo');
export const CommandResult = stubClass('CommandResult');
export const Component = stubClass('Component');
export const Container = stubClass('Container');
export const ContainerSlot = stubClass('ContainerSlot');
export const CustomCommandOrigin = stubClass('CustomCommandOrigin');
export const CustomCommandRegistry = stubClass('CustomCommandRegistry');
export const CustomComponentParameters = stubClass('CustomComponentParameters');
export const DamagedByEntityCondition = stubClass('DamagedByEntityCondition');
export const DataDrivenEntityTriggerAfterEvent = stubClass('DataDrivenEntityTriggerAfterEvent');
export const DataDrivenEntityTriggerAfterEventSignal = stubClass('DataDrivenEntityTriggerAfterEventSignal');
export const Dimension = stubClass('Dimension');
export const DimensionRegistry = stubClass('DimensionRegistry');
export const DimensionType = stubClass('DimensionType');
export const DimensionTypes = stubClass('DimensionTypes');
export const Effect = stubClass('Effect');
export const EffectAddAfterEvent = stubClass('EffectAddAfterEvent');
export const EffectAddAfterEventSignal = stubClass('EffectAddAfterEventSignal');
export const EffectAddBeforeEvent = stubClass('EffectAddBeforeEvent');
export const EffectAddBeforeEventSignal = stubClass('EffectAddBeforeEventSignal');
export const EffectType = stubClass('EffectType');
export const EffectTypes = stubClass('EffectTypes');
export const EmptyLootItem = stubClass('EmptyLootItem');
export const EnchantInfo = stubClass('EnchantInfo');
export const EnchantmentType = stubClass('EnchantmentType');
export const EnchantmentTypes = stubClass('EnchantmentTypes');
export const EnchantRandomEquipmentFunction = stubClass('EnchantRandomEquipmentFunction');
export const EnchantRandomlyFunction = stubClass('EnchantRandomlyFunction');
export const EnchantWithLevelsFunction = stubClass('EnchantWithLevelsFunction');
export const Entity = stubClass('Entity');
export const EntityAddRiderComponent = stubClass('EntityAddRiderComponent');
export const EntityAgeableComponent = stubClass('EntityAgeableComponent');
export const EntityAttributeComponent = stubClass('EntityAttributeComponent');
export const EntityBaseMovementComponent = stubClass('EntityBaseMovementComponent');
export const EntityBreathableComponent = stubClass('EntityBreathableComponent');
export const EntityCanClimbComponent = stubClass('EntityCanClimbComponent');
export const EntityCanFlyComponent = stubClass('EntityCanFlyComponent');
export const EntityCanPowerJumpComponent = stubClass('EntityCanPowerJumpComponent');
export const EntityColor2Component = stubClass('EntityColor2Component');
export const EntityColorComponent = stubClass('EntityColorComponent');
export const EntityComponent = stubClass('EntityComponent');
export const EntityContainerClosedAfterEvent = stubClass('EntityContainerClosedAfterEvent');
export const EntityContainerClosedAfterEventSignal = stubClass('EntityContainerClosedAfterEventSignal');
export const EntityContainerOpenedAfterEvent = stubClass('EntityContainerOpenedAfterEvent');
export const EntityContainerOpenedAfterEventSignal = stubClass('EntityContainerOpenedAfterEventSignal');
export const EntityDefinitionFeedItem = stubClass('EntityDefinitionFeedItem');
export const EntityDieAfterEvent = stubClass('EntityDieAfterEvent');
export const EntityDieAfterEventSignal = stubClass('EntityDieAfterEventSignal');
export const EntityEnderInventoryComponent = stubClass('EntityEnderInventoryComponent');
export const EntityEquippableComponent = stubClass('EntityEquippableComponent');
export const EntityExhaustionComponent = stubClass('EntityExhaustionComponent');
export const EntityFireImmuneComponent = stubClass('EntityFireImmuneComponent');
export const EntityFloatsInLiquidComponent = stubClass('EntityFloatsInLiquidComponent');
export const EntityFlyingSpeedComponent = stubClass('EntityFlyingSpeedComponent');
export const EntityFrictionModifierComponent = stubClass('EntityFrictionModifierComponent');
export const EntityHasMarkVariantCondition = stubClass('EntityHasMarkVariantCondition');
export const EntityHasVariantCondition = stubClass('EntityHasVariantCondition');
export const EntityHealableComponent = stubClass('EntityHealableComponent');
export const EntityHealAfterEvent = stubClass('EntityHealAfterEvent');
export const EntityHealAfterEventSignal = stubClass('EntityHealAfterEventSignal');
export const EntityHealBeforeEvent = stubClass('EntityHealBeforeEvent');
export const EntityHealBeforeEventSignal = stubClass('EntityHealBeforeEventSignal');
export const EntityHealSource = stubClass('EntityHealSource');
export const EntityHealthChangedAfterEvent = stubClass('EntityHealthChangedAfterEvent');
export const EntityHealthChangedAfterEventSignal = stubClass('EntityHealthChangedAfterEventSignal');
export const EntityHealthComponent = stubClass('EntityHealthComponent');
export const EntityHitBlockAfterEvent = stubClass('EntityHitBlockAfterEvent');
export const EntityHitBlockAfterEventSignal = stubClass('EntityHitBlockAfterEventSignal');
export const EntityHitEntityAfterEvent = stubClass('EntityHitEntityAfterEvent');
export const EntityHitEntityAfterEventSignal = stubClass('EntityHitEntityAfterEventSignal');
export const EntityHungerComponent = stubClass('EntityHungerComponent');
export const EntityHurtAfterEvent = stubClass('EntityHurtAfterEvent');
export const EntityHurtAfterEventSignal = stubClass('EntityHurtAfterEventSignal');
export const EntityHurtBeforeEvent = stubClass('EntityHurtBeforeEvent');
export const EntityHurtBeforeEventSignal = stubClass('EntityHurtBeforeEventSignal');
export const EntityInventoryComponent = stubClass('EntityInventoryComponent');
export const EntityIsBabyComponent = stubClass('EntityIsBabyComponent');
export const EntityIsChargedComponent = stubClass('EntityIsChargedComponent');
export const EntityIsChestedComponent = stubClass('EntityIsChestedComponent');
export const EntityIsDyeableComponent = stubClass('EntityIsDyeableComponent');
export const EntityIsHiddenWhenInvisibleComponent = stubClass('EntityIsHiddenWhenInvisibleComponent');
export const EntityIsIgnitedComponent = stubClass('EntityIsIgnitedComponent');
export const EntityIsIllagerCaptainComponent = stubClass('EntityIsIllagerCaptainComponent');
export const EntityIsSaddledComponent = stubClass('EntityIsSaddledComponent');
export const EntityIsShakingComponent = stubClass('EntityIsShakingComponent');
export const EntityIsShearedComponent = stubClass('EntityIsShearedComponent');
export const EntityIsStackableComponent = stubClass('EntityIsStackableComponent');
export const EntityIsStunnedComponent = stubClass('EntityIsStunnedComponent');
export const EntityIsTamedComponent = stubClass('EntityIsTamedComponent');
export const EntityItemComponent = stubClass('EntityItemComponent');
export const EntityItemDropAfterEvent = stubClass('EntityItemDropAfterEvent');
export const EntityItemDropAfterEventSignal = stubClass('EntityItemDropAfterEventSignal');
export const EntityItemPickupAfterEvent = stubClass('EntityItemPickupAfterEvent');
export const EntityItemPickupAfterEventSignal = stubClass('EntityItemPickupAfterEventSignal');
export const EntityItemPickupBeforeEvent = stubClass('EntityItemPickupBeforeEvent');
export const EntityItemPickupBeforeEventSignal = stubClass('EntityItemPickupBeforeEventSignal');
export const EntityKilledCondition = stubClass('EntityKilledCondition');
export const EntityLavaMovementComponent = stubClass('EntityLavaMovementComponent');
export const EntityLeashableComponent = stubClass('EntityLeashableComponent');
export const EntityLoadAfterEvent = stubClass('EntityLoadAfterEvent');
export const EntityLoadAfterEventSignal = stubClass('EntityLoadAfterEventSignal');
export const EntityMarkVariantComponent = stubClass('EntityMarkVariantComponent');
export const EntityMovementAmphibiousComponent = stubClass('EntityMovementAmphibiousComponent');
export const EntityMovementBasicComponent = stubClass('EntityMovementBasicComponent');
export const EntityMovementComponent = stubClass('EntityMovementComponent');
export const EntityMovementFlyComponent = stubClass('EntityMovementFlyComponent');
export const EntityMovementGenericComponent = stubClass('EntityMovementGenericComponent');
export const EntityMovementGlideComponent = stubClass('EntityMovementGlideComponent');
export const EntityMovementHoverComponent = stubClass('EntityMovementHoverComponent');
export const EntityMovementJumpComponent = stubClass('EntityMovementJumpComponent');
export const EntityMovementSkipComponent = stubClass('EntityMovementSkipComponent');
export const EntityMovementSwayComponent = stubClass('EntityMovementSwayComponent');
export const EntityNavigationClimbComponent = stubClass('EntityNavigationClimbComponent');
export const EntityNavigationComponent = stubClass('EntityNavigationComponent');
export const EntityNavigationFloatComponent = stubClass('EntityNavigationFloatComponent');
export const EntityNavigationFlyComponent = stubClass('EntityNavigationFlyComponent');
export const EntityNavigationGenericComponent = stubClass('EntityNavigationGenericComponent');
export const EntityNavigationHoverComponent = stubClass('EntityNavigationHoverComponent');
export const EntityNavigationWalkComponent = stubClass('EntityNavigationWalkComponent');
export const EntityOnFireComponent = stubClass('EntityOnFireComponent');
export const EntityProjectileComponent = stubClass('EntityProjectileComponent');
export const EntityPushThroughComponent = stubClass('EntityPushThroughComponent');
export const EntityRemoveAfterEvent = stubClass('EntityRemoveAfterEvent');
export const EntityRemoveAfterEventSignal = stubClass('EntityRemoveAfterEventSignal');
export const EntityRemoveBeforeEvent = stubClass('EntityRemoveBeforeEvent');
export const EntityRemoveBeforeEventSignal = stubClass('EntityRemoveBeforeEventSignal');
export const EntityRideableComponent = stubClass('EntityRideableComponent');
export const EntityRidingComponent = stubClass('EntityRidingComponent');
export const EntitySaturationComponent = stubClass('EntitySaturationComponent');
export const EntityScaleComponent = stubClass('EntityScaleComponent');
export const EntitySkinIdComponent = stubClass('EntitySkinIdComponent');
export const EntitySpawnAfterEvent = stubClass('EntitySpawnAfterEvent');
export const EntitySpawnAfterEventSignal = stubClass('EntitySpawnAfterEventSignal');
export const EntityStrengthComponent = stubClass('EntityStrengthComponent');
export const EntityTameableComponent = stubClass('EntityTameableComponent');
export const EntityTameMountComponent = stubClass('EntityTameMountComponent');
export const EntityType = stubClass('EntityType');
export const EntityTypeFamilyComponent = stubClass('EntityTypeFamilyComponent');
export const EntityTypes = stubClass('EntityTypes');
export const EntityUnderwaterMovementComponent = stubClass('EntityUnderwaterMovementComponent');
export const EntityUpgradeAfterEvent = stubClass('EntityUpgradeAfterEvent');
export const EntityUpgradeAfterEventSignal = stubClass('EntityUpgradeAfterEventSignal');
export const EntityVariantComponent = stubClass('EntityVariantComponent');
export const EntityWantsJockeyComponent = stubClass('EntityWantsJockeyComponent');
export const EntityWaypoint = stubClass('EntityWaypoint');
export const ExplorationMapFunction = stubClass('ExplorationMapFunction');
export const ExplosionAfterEvent = stubClass('ExplosionAfterEvent');
export const ExplosionAfterEventSignal = stubClass('ExplosionAfterEventSignal');
export const ExplosionBeforeEvent = stubClass('ExplosionBeforeEvent');
export const ExplosionBeforeEventSignal = stubClass('ExplosionBeforeEventSignal');
export const ExplosionDecayFunction = stubClass('ExplosionDecayFunction');
export const FeedItem = stubClass('FeedItem');
export const FeedItemEffect = stubClass('FeedItemEffect');
export const FillContainerFunction = stubClass('FillContainerFunction');
export const FluidContainer = stubClass('FluidContainer');
export const GameRuleChangeAfterEvent = stubClass('GameRuleChangeAfterEvent');
export const GameRuleChangeAfterEventSignal = stubClass('GameRuleChangeAfterEventSignal');
export const GameRules = stubClass('GameRules');
export const InputInfo = stubClass('InputInfo');
export const IsBabyCondition = stubClass('IsBabyCondition');
export const ISerializable = stubClass('ISerializable');
export const ItemBookComponent = stubClass('ItemBookComponent');
export const ItemCompleteUseAfterEvent = stubClass('ItemCompleteUseAfterEvent');
export const ItemCompleteUseAfterEventSignal = stubClass('ItemCompleteUseAfterEventSignal');
export const ItemCompleteUseEvent = stubClass('ItemCompleteUseEvent');
export const ItemComponent = stubClass('ItemComponent');
export const ItemComponentBeforeDurabilityDamageEvent = stubClass('ItemComponentBeforeDurabilityDamageEvent');
export const ItemComponentCompleteUseEvent = stubClass('ItemComponentCompleteUseEvent');
export const ItemComponentConsumeEvent = stubClass('ItemComponentConsumeEvent');
export const ItemComponentHitEntityEvent = stubClass('ItemComponentHitEntityEvent');
export const ItemComponentMineBlockEvent = stubClass('ItemComponentMineBlockEvent');
export const ItemComponentRegistry = stubClass('ItemComponentRegistry');
export const ItemComponentUseEvent = stubClass('ItemComponentUseEvent');
export const ItemComponentUseOnEvent = stubClass('ItemComponentUseOnEvent');
export const ItemCompostableComponent = stubClass('ItemCompostableComponent');
export const ItemCooldownComponent = stubClass('ItemCooldownComponent');
export const ItemCustomComponentInstance = stubClass('ItemCustomComponentInstance');
export const ItemDurabilityComponent = stubClass('ItemDurabilityComponent');
export const ItemDyeableComponent = stubClass('ItemDyeableComponent');
export const ItemEnchantableComponent = stubClass('ItemEnchantableComponent');
export const ItemFoodComponent = stubClass('ItemFoodComponent');
export const ItemInventoryComponent = stubClass('ItemInventoryComponent');
export const ItemPotionComponent = stubClass('ItemPotionComponent');
export const ItemReleaseUseAfterEvent = stubClass('ItemReleaseUseAfterEvent');
export const ItemReleaseUseAfterEventSignal = stubClass('ItemReleaseUseAfterEventSignal');
export const ItemStack = stubClass('ItemStack');
export const ItemStartUseAfterEvent = stubClass('ItemStartUseAfterEvent');
export const ItemStartUseAfterEventSignal = stubClass('ItemStartUseAfterEventSignal');
export const ItemStartUseOnAfterEvent = stubClass('ItemStartUseOnAfterEvent');
export const ItemStartUseOnAfterEventSignal = stubClass('ItemStartUseOnAfterEventSignal');
export const ItemStopUseAfterEvent = stubClass('ItemStopUseAfterEvent');
export const ItemStopUseAfterEventSignal = stubClass('ItemStopUseAfterEventSignal');
export const ItemStopUseOnAfterEvent = stubClass('ItemStopUseOnAfterEvent');
export const ItemStopUseOnAfterEventSignal = stubClass('ItemStopUseOnAfterEventSignal');
export const ItemType = stubClass('ItemType');
export const ItemTypes = stubClass('ItemTypes');
export const ItemUseAfterEvent = stubClass('ItemUseAfterEvent');
export const ItemUseAfterEventSignal = stubClass('ItemUseAfterEventSignal');
export const ItemUseBeforeEvent = stubClass('ItemUseBeforeEvent');
export const ItemUseBeforeEventSignal = stubClass('ItemUseBeforeEventSignal');
export const ItemUseOnEvent = stubClass('ItemUseOnEvent');
export const KilledByEntityCondition = stubClass('KilledByEntityCondition');
export const KilledByPlayerCondition = stubClass('KilledByPlayerCondition');
export const KilledByPlayerOrPetsCondition = stubClass('KilledByPlayerOrPetsCondition');
export const LeverActionAfterEvent = stubClass('LeverActionAfterEvent');
export const LeverActionAfterEventSignal = stubClass('LeverActionAfterEventSignal');
export const LinearSpline = stubClass('LinearSpline');
export const ListBlockVolume = stubClass('ListBlockVolume');
export const LocationWaypoint = stubClass('LocationWaypoint');
export const LocatorBar = stubClass('LocatorBar');
export const LootingEnchantFunction = stubClass('LootingEnchantFunction');
export const LootItem = stubClass('LootItem');
export const LootItemCondition = stubClass('LootItemCondition');
export const LootItemFunction = stubClass('LootItemFunction');
export const LootPool = stubClass('LootPool');
export const LootPoolEntry = stubClass('LootPoolEntry');
export const LootPoolTiers = stubClass('LootPoolTiers');
export const LootTable = stubClass('LootTable');
export const LootTableEntry = stubClass('LootTableEntry');
export const LootTableManager = stubClass('LootTableManager');
export const LootTableReference = stubClass('LootTableReference');
export const MatchToolCondition = stubClass('MatchToolCondition');
export const MolangVariableMap = stubClass('MolangVariableMap');
export const PassengerOfEntityCondition = stubClass('PassengerOfEntityCondition');
export const PistonActivateAfterEvent = stubClass('PistonActivateAfterEvent');
export const PistonActivateAfterEventSignal = stubClass('PistonActivateAfterEventSignal');
export const Player = stubClass('Player');
export const PlayerAimAssist = stubClass('PlayerAimAssist');
export const PlayerBreakBlockAfterEvent = stubClass('PlayerBreakBlockAfterEvent');
export const PlayerBreakBlockAfterEventSignal = stubClass('PlayerBreakBlockAfterEventSignal');
export const PlayerBreakBlockBeforeEvent = stubClass('PlayerBreakBlockBeforeEvent');
export const PlayerBreakBlockBeforeEventSignal = stubClass('PlayerBreakBlockBeforeEventSignal');
export const PlayerButtonInputAfterEvent = stubClass('PlayerButtonInputAfterEvent');
export const PlayerButtonInputAfterEventSignal = stubClass('PlayerButtonInputAfterEventSignal');
export const PlayerCursorInventoryComponent = stubClass('PlayerCursorInventoryComponent');
export const PlayerDimensionChangeAfterEvent = stubClass('PlayerDimensionChangeAfterEvent');
export const PlayerDimensionChangeAfterEventSignal = stubClass('PlayerDimensionChangeAfterEventSignal');
export const PlayerEmoteAfterEvent = stubClass('PlayerEmoteAfterEvent');
export const PlayerEmoteAfterEventSignal = stubClass('PlayerEmoteAfterEventSignal');
export const PlayerGameModeChangeAfterEvent = stubClass('PlayerGameModeChangeAfterEvent');
export const PlayerGameModeChangeAfterEventSignal = stubClass('PlayerGameModeChangeAfterEventSignal');
export const PlayerGameModeChangeBeforeEvent = stubClass('PlayerGameModeChangeBeforeEvent');
export const PlayerGameModeChangeBeforeEventSignal = stubClass('PlayerGameModeChangeBeforeEventSignal');
export const PlayerHotbarSelectedSlotChangeAfterEvent = stubClass('PlayerHotbarSelectedSlotChangeAfterEvent');
export const PlayerHotbarSelectedSlotChangeAfterEventSignal = stubClass('PlayerHotbarSelectedSlotChangeAfterEventSignal');
export const PlayerInputModeChangeAfterEvent = stubClass('PlayerInputModeChangeAfterEvent');
export const PlayerInputModeChangeAfterEventSignal = stubClass('PlayerInputModeChangeAfterEventSignal');
export const PlayerInputPermissionCategoryChangeAfterEvent = stubClass('PlayerInputPermissionCategoryChangeAfterEvent');
export const PlayerInputPermissionCategoryChangeAfterEventSignal = stubClass('PlayerInputPermissionCategoryChangeAfterEventSignal');
export const PlayerInputPermissions = stubClass('PlayerInputPermissions');
export const PlayerInteractWithBlockAfterEvent = stubClass('PlayerInteractWithBlockAfterEvent');
export const PlayerInteractWithBlockAfterEventSignal = stubClass('PlayerInteractWithBlockAfterEventSignal');
export const PlayerInteractWithBlockBeforeEvent = stubClass('PlayerInteractWithBlockBeforeEvent');
export const PlayerInteractWithBlockBeforeEventSignal = stubClass('PlayerInteractWithBlockBeforeEventSignal');
export const PlayerInteractWithEntityAfterEvent = stubClass('PlayerInteractWithEntityAfterEvent');
export const PlayerInteractWithEntityAfterEventSignal = stubClass('PlayerInteractWithEntityAfterEventSignal');
export const PlayerInteractWithEntityBeforeEvent = stubClass('PlayerInteractWithEntityBeforeEvent');
export const PlayerInteractWithEntityBeforeEventSignal = stubClass('PlayerInteractWithEntityBeforeEventSignal');
export const PlayerInventoryItemChangeAfterEvent = stubClass('PlayerInventoryItemChangeAfterEvent');
export const PlayerInventoryItemChangeAfterEventSignal = stubClass('PlayerInventoryItemChangeAfterEventSignal');
export const PlayerJoinAfterEvent = stubClass('PlayerJoinAfterEvent');
export const PlayerJoinAfterEventSignal = stubClass('PlayerJoinAfterEventSignal');
export const PlayerLeaveAfterEvent = stubClass('PlayerLeaveAfterEvent');
export const PlayerLeaveAfterEventSignal = stubClass('PlayerLeaveAfterEventSignal');
export const PlayerLeaveBeforeEvent = stubClass('PlayerLeaveBeforeEvent');
export const PlayerLeaveBeforeEventSignal = stubClass('PlayerLeaveBeforeEventSignal');
export const PlayerPlaceBlockAfterEvent = stubClass('PlayerPlaceBlockAfterEvent');
export const PlayerPlaceBlockAfterEventSignal = stubClass('PlayerPlaceBlockAfterEventSignal');
export const PlayerSpawnAfterEvent = stubClass('PlayerSpawnAfterEvent');
export const PlayerSpawnAfterEventSignal = stubClass('PlayerSpawnAfterEventSignal');
export const PlayerSwingStartAfterEvent = stubClass('PlayerSwingStartAfterEvent');
export const PlayerSwingStartAfterEventSignal = stubClass('PlayerSwingStartAfterEventSignal');
export const PlayerWaypoint = stubClass('PlayerWaypoint');
export const PotionDeliveryType = stubClass('PotionDeliveryType');
export const PotionEffectType = stubClass('PotionEffectType');
export const Potions = stubClass('Potions');
export const PressurePlatePopAfterEvent = stubClass('PressurePlatePopAfterEvent');
export const PressurePlatePopAfterEventSignal = stubClass('PressurePlatePopAfterEventSignal');
export const PressurePlatePushAfterEvent = stubClass('PressurePlatePushAfterEvent');
export const PressurePlatePushAfterEventSignal = stubClass('PressurePlatePushAfterEventSignal');
export const PrimitiveShape = stubClass('PrimitiveShape');
export const PrimitiveShapesManager = stubClass('PrimitiveShapesManager');
export const ProjectileHitBlockAfterEvent = stubClass('ProjectileHitBlockAfterEvent');
export const ProjectileHitBlockAfterEventSignal = stubClass('ProjectileHitBlockAfterEventSignal');
export const ProjectileHitEntityAfterEvent = stubClass('ProjectileHitEntityAfterEvent');
export const ProjectileHitEntityAfterEventSignal = stubClass('ProjectileHitEntityAfterEventSignal');
export const RandomAuxValueFunction = stubClass('RandomAuxValueFunction');
export const RandomBlockStateFunction = stubClass('RandomBlockStateFunction');
export const RandomChanceCondition = stubClass('RandomChanceCondition');
export const RandomChanceWithLootingCondition = stubClass('RandomChanceWithLootingCondition');
export const RandomDifficultyChanceCondition = stubClass('RandomDifficultyChanceCondition');
export const RandomDyeFunction = stubClass('RandomDyeFunction');
export const RandomRegionalDifficultyChanceCondition = stubClass('RandomRegionalDifficultyChanceCondition');
export const Scoreboard = stubClass('Scoreboard');
export const ScoreboardIdentity = stubClass('ScoreboardIdentity');
export const ScoreboardObjective = stubClass('ScoreboardObjective');
export const ScoreboardScoreInfo = stubClass('ScoreboardScoreInfo');
export const ScreenDisplay = stubClass('ScreenDisplay');
export const ScriptEventCommandMessageAfterEvent = stubClass('ScriptEventCommandMessageAfterEvent');
export const ScriptEventCommandMessageAfterEventSignal = stubClass('ScriptEventCommandMessageAfterEventSignal');
export const Seat = stubClass('Seat');
export const SetArmorTrimFunction = stubClass('SetArmorTrimFunction');
export const SetBannerDetailsFunction = stubClass('SetBannerDetailsFunction');
export const SetBookContentsFunction = stubClass('SetBookContentsFunction');
export const SetDataFromColorIndexFunction = stubClass('SetDataFromColorIndexFunction');
export const SetItemCountFunction = stubClass('SetItemCountFunction');
export const SetItemDamageFunction = stubClass('SetItemDamageFunction');
export const SetItemDataFunction = stubClass('SetItemDataFunction');
export const SetItemLoreFunction = stubClass('SetItemLoreFunction');
export const SetItemNameFunction = stubClass('SetItemNameFunction');
export const SetOminousBottleFunction = stubClass('SetOminousBottleFunction');
export const SetPotionFunction = stubClass('SetPotionFunction');
export const SetSpawnEggFunction = stubClass('SetSpawnEggFunction');
export const SetStewEffectFunction = stubClass('SetStewEffectFunction');
export const ShutdownBeforeEventSignal = stubClass('ShutdownBeforeEventSignal');
export const ShutdownEvent = stubClass('ShutdownEvent');
export const SmeltItemFunction = stubClass('SmeltItemFunction');
export const SpecificEnchantFunction = stubClass('SpecificEnchantFunction');
export const StartupBeforeEventSignal = stubClass('StartupBeforeEventSignal');
export const StartupEvent = stubClass('StartupEvent');
export const Structure = stubClass('Structure');
export const StructureManager = stubClass('StructureManager');
export const System = stubClass('System');
export const SystemAfterEvents = stubClass('SystemAfterEvents');
export const SystemBeforeEvents = stubClass('SystemBeforeEvents');
export const SystemInfo = stubClass('SystemInfo');
export const TargetBlockHitAfterEvent = stubClass('TargetBlockHitAfterEvent');
export const TargetBlockHitAfterEventSignal = stubClass('TargetBlockHitAfterEventSignal');
export const TextPrimitive = stubClass('TextPrimitive');
export const TickingAreaManager = stubClass('TickingAreaManager');
export const Trigger = stubClass('Trigger');
export const TripWireTripAfterEvent = stubClass('TripWireTripAfterEvent');
export const TripWireTripAfterEventSignal = stubClass('TripWireTripAfterEventSignal');
export const Waypoint = stubClass('Waypoint');
export const WeatherChangeAfterEvent = stubClass('WeatherChangeAfterEvent');
export const WeatherChangeAfterEventSignal = stubClass('WeatherChangeAfterEventSignal');
export const WeatherChangeBeforeEvent = stubClass('WeatherChangeBeforeEvent');
export const WeatherChangeBeforeEventSignal = stubClass('WeatherChangeBeforeEventSignal');
export const World = stubClass('World');
export const WorldAfterEvents = stubClass('WorldAfterEvents');
export const WorldBeforeEvents = stubClass('WorldBeforeEvents');
export const WorldLoadAfterEvent = stubClass('WorldLoadAfterEvent');
export const WorldLoadAfterEventSignal = stubClass('WorldLoadAfterEventSignal');
export const BlockCustomComponentAlreadyRegisteredError = stubClass('BlockCustomComponentAlreadyRegisteredError');
export const BlockCustomComponentReloadNewComponentError = stubClass('BlockCustomComponentReloadNewComponentError');
export const BlockCustomComponentReloadNewEventError = stubClass('BlockCustomComponentReloadNewEventError');
export const BlockCustomComponentReloadVersionError = stubClass('BlockCustomComponentReloadVersionError');
export const BookError = stubClass('BookError');
export const BookPageContentError = stubClass('BookPageContentError');
export const CommandError = stubClass('CommandError');
export const ContainerRulesError = stubClass('ContainerRulesError');
export const CustomCommandError = stubClass('CustomCommandError');
export const CustomComponentInvalidRegistryError = stubClass('CustomComponentInvalidRegistryError');
export const CustomComponentNameError = stubClass('CustomComponentNameError');
export const CustomDimensionAlreadyRegisteredError = stubClass('CustomDimensionAlreadyRegisteredError');
export const CustomDimensionInvalidRegistryError = stubClass('CustomDimensionInvalidRegistryError');
export const CustomDimensionNameError = stubClass('CustomDimensionNameError');
export const CustomDimensionReloadNewDimensionError = stubClass('CustomDimensionReloadNewDimensionError');
export const EnchantmentLevelOutOfBoundsError = stubClass('EnchantmentLevelOutOfBoundsError');
export const EnchantmentTypeNotCompatibleError = stubClass('EnchantmentTypeNotCompatibleError');
export const EnchantmentTypeUnknownIdError = stubClass('EnchantmentTypeUnknownIdError');
export const EntitySpawnError = stubClass('EntitySpawnError');
export const InvalidBlockComponentError = stubClass('InvalidBlockComponentError');
export const InvalidContainerError = stubClass('InvalidContainerError');
export const InvalidContainerSlotError = stubClass('InvalidContainerSlotError');
export const InvalidEntityComponentError = stubClass('InvalidEntityComponentError');
export const InvalidEntityError = stubClass('InvalidEntityError');
export const InvalidItemStackError = stubClass('InvalidItemStackError');
export const InvalidIteratorError = stubClass('InvalidIteratorError');
export const InvalidPotionDeliveryTypeError = stubClass('InvalidPotionDeliveryTypeError');
export const InvalidPotionEffectTypeError = stubClass('InvalidPotionEffectTypeError');
export const InvalidStructureError = stubClass('InvalidStructureError');
export const InvalidWaypointError = stubClass('InvalidWaypointError');
export const InvalidWaypointTextureSelectorError = stubClass('InvalidWaypointTextureSelectorError');
export const ItemCustomComponentAlreadyRegisteredError = stubClass('ItemCustomComponentAlreadyRegisteredError');
export const ItemCustomComponentReloadNewComponentError = stubClass('ItemCustomComponentReloadNewComponentError');
export const ItemCustomComponentReloadNewEventError = stubClass('ItemCustomComponentReloadNewEventError');
export const ItemCustomComponentReloadVersionError = stubClass('ItemCustomComponentReloadVersionError');
export const LocationInUnloadedChunkError = stubClass('LocationInUnloadedChunkError');
export const LocationOutOfWorldBoundariesError = stubClass('LocationOutOfWorldBoundariesError');
export const LocatorBarError = stubClass('LocatorBarError');
export const NamespaceNameError = stubClass('NamespaceNameError');
export const PlaceJigsawError = stubClass('PlaceJigsawError');
export const PrimitiveShapeError = stubClass('PrimitiveShapeError');
export const RawMessageError = stubClass('RawMessageError');
export const TickingAreaError = stubClass('TickingAreaError');
export const UnloadedChunksError = stubClass('UnloadedChunksError');
