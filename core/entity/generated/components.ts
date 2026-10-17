// このファイルは scripts/gen-entity-components.mjs が生成する。手で編集しないこと。
// 生成元: @minecraft/bedrock-schemas 1.26.50（MIT License, Copyright (c) Microsoft Corporation）
/* eslint-disable */
import { component, type Component, type EventRef, type EventTrigger } from '../component';

export const COMPONENT_SOURCE_VERSION = '1.26.50';

export type EntityMinecraftAddrider = {
  /** Type of entity to acquire as a rider */
  entity_type?: string;
  /** Trigger event when a rider is acquired */
  spawn_event?: string | EventRef;
  /** List of riders to be added to the entity. Can only spawn as many riders as "minecraft:rideable" has "seat_count".
  
  Sample values:
  • cave_spider: [{"entity_type":"minecraft:bogged"}]
  • cave_spider: [{"entity_type":"minecraft:wither_skeleton"}] */
  riders?: EntityRiderData[];
};
export type EntityRiderData = {
  /** The entity type that will be riding this entity. */
  entity_type: string;
  /** The spawn event that will be used when the riding entity is created.
   * @default "" */
  spawn_event?: string | EventRef;
};
export type EntityMinecraftAdmireItem = {
  /** Duration, in seconds, for which mob won't admire items if it was hurt
   * @default 10 */
  cooldown_after_being_attacked?: number;
  /** Duration, in seconds, that the mob admires an item.
   * @default 10 */
  duration?: number;
};
export type EntityMinecraftAgeable = {
  /** Length of time before an entity grows up (-1 to always stay a baby)
  
  Sample values:
  • chicken: 1200
   * @default 1200 */
  duration?: number;
  /** List of items that can be fed to an entity to age them up. Can be a single item string, an array of strings, or an array of objects with item and growth properties.
  
  Sample values:
  • chicken: ["wheat_seeds","beetroot_seeds","melon_seeds","...
  • cow: wheat
  • dolphin: ["fish","salmon"] */
  feed_items?: (Array<{
      /** The item identifier. */
      item?: string;
      /** How much the entity ages when fed this item. */
      growth?: number;
    }>) | string[] | string;
  /** List of items that are dropped when an entity grows up */
  drop_items?: string[];
  /** Event to fire when an entity grows up. Can be an object with event and target properties, or a simple event string.
  
  Sample values:
  • chicken: {"event":"minecraft:ageable_grow_up","target":"...
  • dolphin: {"event":"ageable_grow_up","target":"self"} */
  grow_up?: Record<string, unknown> | string;
  /** List of items that can be fed to a baby entity to pause its growth.
  
  *Introduced in version 1.26.10*
  
  Sample values:
  • chicken: ["golden_dandelion"] */
  pause_growth_items?: string[];
  /** List of items that can be fed to a baby entity to reset its growth timer.
  
  *Introduced in version 1.26.10*
  
  Sample values:
  • chicken: ["golden_dandelion"] */
  reset_growth_items?: string[];
  /** Event triggered when a baby entity's growth is paused (via a `pause_growth_items` feed). Can be an object with `event` and `target` properties, or a simple event string.
  
  *Introduced in version 1.26.10* */
  pause_growth?: Record<string, unknown> | string;
  /** Event triggered when a baby entity's growth is reset (via a `reset_growth_items` feed). Can be an object with `event` and `target` properties, or a simple event string.
  
  *Introduced in version 1.26.10* */
  reset_growth?: Record<string, unknown> | string;
  /** List of conditions to meet so that the entity can be fed. */
  interact_filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
};
export type EntityMinecraftAmbientSoundInterval = {
  /** Level sound event to be played as the ambient sound.
  
  Sample values:
  • allay: ambient
   * @default "ambient" */
  event_name?: string;
  /** List of dynamic level sound events, with conditions for choosing between them. Evaluated in order, first one wins. If none evaluate to true, 'event_name' will take precedence.
  
  Sample values:
  • allay: [{"condition":"query.is_using_item","event_name...
  • breeze: [{"condition":"!query.is_on_ground","event_name... */
  event_names?: Array<{
      /** The condition that must be satisfied to select the given ambient sound */
      condition?: string;
      /** Level sound event to be played as the ambient sound */
      event_name?: string;
    }>;
  /** Maximum time in seconds to randomly add to the ambient sound delay time.
   * @default 16 */
  range?: number;
  /** Minimum time in seconds before the entity plays its ambient sound again.
   * @default 8 */
  value?: number;
};
export type EntityMinecraftAngerLevel = {
  /** Anger level will decay over time. Defines how often anger towards all nuisances will decrease by one.
  
  Sample values:
  • warden: 1
   * @default 1 */
  anger_decrement_interval?: number;
  /** The default amount of annoyingness for any given nuisance. Specifies how much to raise anger level on each provocation.
  
  Sample values:
  • warden: 35
   * @default 0 */
  default_annoyingness?: number;
  /** Anger boost applied to angry threshold when the entity gets angry. */
  sound_interval?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** The amount of time in seconds that the entity will be angry. */
  duration?: number;
  /** Variance in seconds added to the duration [-delta, delta]. */
  duration_delta?: number;
  /** Filter out mob types that it should not attack while angry (other Piglins) */
  filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** If set, other entities of the same entity definition within the broadcastRange will also become angry
   * @default false */
  broadcast_anger?: boolean;
  /** If set, other entities of the same entity definition within the broadcastRange will also become angry whenever this mob attacks
   * @default false */
  broadcast_anger_on_attack?: boolean;
  /** Distance in blocks within which other entities of the same entity type will become angry
   * @default 20 */
  broadcast_range?: number;
  /** A list of entity families to broadcast anger to */
  broadcast_targets?: string[];
  /** Conditions that make this entry in the list valid */
  broadcast_filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** Event to fire when this entity is calmed down */
  calm_event?: string | EventRef;
  /** Sounds to play when the entity is getting provoked. Evaluated in order. First matching condition wins
  
  Sample values:
  • warden: [{"condition":"query.anger_level(this) >= 40","... */
  on_increase_sounds?: EntitySounddefinition[];
  /** Anger boost applied to angry threshold when mob gets angry.
  
  Sample values:
  • warden: 20
   * @default 20 */
  angry_boost?: number;
  /** Threshold that define when the mob is considered angry at a nuisance.
  
  Sample values:
  • warden: 80
   * @default 80 */
  angry_threshold?: number;
  /** The default amount of annoyingness for any given nuisance that is a projectile. Specifies how much to raise anger level on each provocation.
  
  Sample values:
  • warden: 10
   * @default 0 */
  default_projectile_annoyingness?: number;
  /** The maximum anger level that can be reached. Applies to any nuisance.
  
  Sample values:
  • warden: 150
   * @default 100 */
  max_anger?: number;
  /** Filter that is applied to determine if a mob can be a nuisance.
  
  Sample values:
  • warden: {"all_of":[{"operator":"not","test":"is_family"... */
  nuisance_filter?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Defines if the mob should remove target if it falls below 'angry' threshold.
  
  Sample values:
  • warden: true
   * @default true */
  remove_targets_below_angry_threshold?: boolean;
};
export type EntitySounddefinition = {
  /** A Molang expression describing under which conditions to play this sound, given that the entity was provoked. */
  condition: ({
      [key: string]: string;
    }) | string | ({
      [key: string]: unknown;
    }) | number;
  /** The sound to play. */
  sound: string;
};
export type EntityMinecraftAngry = {
  /** The sound event to play when the mob is angry */
  angry_sound?: string;
  /** The range of time in seconds to randomly wait before playing the sound again.
   * @default 0 */
  sound_interval?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** The amount of time in seconds that the entity will be angry.
   * @default 25 */
  duration?: number;
  /** Variance in seconds added to the duration [-delta, delta].
   * @default 0 */
  duration_delta?: number;
  /** Filter out mob types that it should not attack while angry (other Piglins) */
  filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** If set, other entities of the same entity definition within the broadcastRange will also become angry
   * @default false */
  broadcast_anger?: boolean;
  /** If set, other entities of the same entity definition within the broadcastRange will also become angry whenever this mob attacks
   * @default false */
  broadcast_anger_on_attack?: boolean;
  /** Distance in blocks within which other entities of the same entity type will become angry
   * @default 20 */
  broadcast_range?: number;
  /** A list of entity families to broadcast anger to */
  broadcast_targets?: string[];
  /** Conditions that make this entry in the list valid */
  broadcast_filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** Event to fire when this entity is calmed down. Can be a simple event name string or an object with event and target properties. */
  calm_event?: EventTrigger | string | EventRef;
  /** If true, other entities of the same entity definition within the broadcastRange will also become angry whenever this mob is attacked
   * @default false */
  broadcast_anger_on_being_attacked?: boolean;
  /** If false, when this mob is killed it does not spread its anger to other entities of the same entity definition within the broadcastRange
   * @default true */
  broadcast_anger_when_dying?: boolean;
};
export type EntityMinecraftAnnotationBreakDoor = {
  /** The time in seconds required to break through doors.
   * @default 12 */
  break_time?: number;
  /** The minimum difficulty that the world must be on for this entity to break doors.
   * @default "hard" */
  min_difficulty?: string;
};
export type EntityMinecraftAnnotationOpenDoor = Record<string, unknown>;
export type EntityMinecraftAreaAttack = {
  /** The type of damage that is applied to entities that enter the damage range. A list of available damage sources can be found at [Entity Damage Sources located in the Vanilla Listings Documentation](../../../VanillaListingsReference/AddonEntityDamageSources.md).
  
  Sample values:
  • magma_cube: entity_attack */
  cause?: string;
  /** The set of entities that are valid to apply the damage to when within range.
  
  Sample values:
  • magma_cube: {"any_of":[{"subject":"other","test":"is_family... */
  entity_filter?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** How much damage per tick is applied to entities that enter the damage range.
  
  Sample values:
  • magma_cube: 6
  • magma_cube: 4
  • magma_cube: 3
   * @default 2 */
  damage_per_tick?: number;
  /** How close a hostile entity must be to have the damage applied.
  
  Sample values:
  • magma_cube: 0.15
   * @default 0.2 */
  damage_range?: number;
  /** Whether the entity is treated as the source of the area damage. When true (default), other entities can retaliate against the attacking entity. Set to false to apply damage without making the attacker a valid retaliation target.
  
  *Introduced in version 1.26.30*
   * @default true */
  use_self_as_damage_source?: boolean;
  /** Attack cooldown (in seconds) for how often this entity can attack a target.
  
  Sample values:
  • magma_cube: 0.5
   * @default 0 */
  damage_cooldown?: number;
  /** A localization key to use as the death message when the area attack kills an entity. If empty, the default death message for the damage cause is used. */
  death_message_override?: string;
  /** If the entity should play their attack sound when attacking a target.
   * @default true */
  play_attack_sound?: boolean;
};
export type EntityMinecraftAttack = {
  /** Range of the random amount of damage the melee attack deals. A negative value can heal the entity instead of hurting it. Can be a number, an array [min, max], or an object with range_min and range_max properties. */
  damage?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** Amplifier level (potion tier) of the status ailment applied to the damaged entity. Higher values increase the strength of the effect.
   * @default 0 */
  effect_amplifier?: number;
  /** Duration in seconds of the status ailment applied to the damaged entity.
   * @default 0 */
  effect_duration?: number;
  /** Identifier of the status ailment to apply to an entity attacked by this entity's melee attack. */
  effect_name?: string;
};
export type EntityMinecraftAttackCooldown = {
  /** Event to be run when the cooldown is complete. Can be an object with event and target properties, or a simple event string. */
  attack_cooldown_complete_event?: EventTrigger | string | EventRef;
  /** Amount of time in seconds for the cooldown. Can be specified as a number or a pair of numbers (min and max). */
  attack_cooldown_time?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
};
export type EntityMinecraftAttackDamage = {
  /** How much an attack should damage a target. */
  value?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
};
export type EntityMinecraftBalloonable = {
  /** Distance in blocks at which the 'spring' effect that lifts it.
   * @default 2 */
  soft_distance?: number;
  /** Distance in blocks at which the balloon breaks.
   * @default 10 */
  max_distance?: number;
  /** Event to call when this entity is ballooned. */
  on_balloon?: string | ({
      event?: string | EventRef;
      target?: string;
    });
  /** Event to call when this entity is unballooned. */
  on_unballoon?: string | ({
      event?: string | EventRef;
      target?: string;
    });
  /** Mass that this entity will have when computing balloon pull forces.
   * @default 1 */
  mass?: number;
};
export type EntityMinecraftBarter = {
  /** Loot table that's used to drop a random item.
   * @default "" */
  barter_table?: string;
  /** Duration, in seconds, for which mob won't barter items if it was hurt.
   * @default 10 */
  cooldown_after_being_attacked?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
};
export type EntityMinecraftBehaviorAdmireItem = {
  /** The range of time in seconds to randomly wait before playing the sound again. Can be a number, an array [min, max], or an object with range_min and range_max. */
  sound_interval?: number | (Array<{
      "0"?: number;
      "1"?: number;
    }>) | ({
      /** Minimum interval */
      range_min?: number;
      /** Maximum interval */
      range_max?: number;
      /** Minimum interval */
      min?: number;
      /** Maximum interval */
      max?: number;
    });
  /** The sound event to play when admiring the item
   * @default "" */
  admire_item_sound?: string;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Event to run when the mob starts admiring an item. */
  on_admire_item_start?: EntityActordefinitiontrigger;
  /** Event to run when the mob stops admiring an item. */
  on_admire_item_stop?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityActordefinitiontrigger = {
  /** Event
   * @default "" */
  event?: string | EventRef;
  /** Filters allow data objects to specify test criteria which allows their use. Filters can be defined by a single object of type (Filter Test), an array of tests, collection groups, or a combination of these objects. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Target
   * @default "self" */
  target?: "baby" | "block" | "damager" | "holder" | "item" | "other" | "parent" | "player" | "self" | "target";
};
export type EntityMinecraftBehaviorBarter = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorBeg = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** List of items that this mob likes */
  items?: string | ({
      [key: string]: string;
    });
  /** Distance in blocks the mob will beg from
   * @default 8 */
  look_distance?: number;
  /** The range of time in seconds this mob will stare at the player holding a food they like, begging for it */
  look_time?: number | [number, number] | Intrange;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type Intrange = {
  /** Max
   * @default 0 */
  max?: number;
  /** Min
   * @default 0 */
  min?: number;
};
export type EntityMinecraftBehaviorBreakDoor = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorBreed = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • chicken: 3
  • frog: 4
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier applied to the mob when using this AI Goal.
  
  Sample values:
  • chicken: 1
  • goat: 0.6
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorDefendTrustedTarget = {
  /** Sound to occasionally play while defending.
   * @default "undefined" */
  aggro_sound?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** Time in seconds between attacks
   * @default 0 */
  attack_interval?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** List of entity types that this mob considers valid targets */
  entity_types?: (Array<{
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** If true, the mob has to be visible to be a valid choice
       * @default false */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the running speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    }>) | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** If true, only entities in this mob's viewing range can be selected as targets
   * @default false */
  must_see?: boolean;
  /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
   * @default 3 */
  must_see_forget_duration?: number;
  /** Trigger to be executed when defending begins. */
  on_defend_start?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Distance in blocks that the target can be within to launch an attack
   * @default 0 */
  within_radius?: number;
};
export type EntityMinecraftBehaviorDoorInteract = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorDragondeath = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorDragonholdingpattern = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • ender_dragon: 3
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorDragonlanding = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorDragonscanning = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • ender_dragon: 2
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorDragontakeoff = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorDrinkPotion = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** A list of potions that this entity can drink. Each potion entry has the following parameters: */
  potions?: EntityDrinkpotiongoaldefinitionPotiondata[];
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The movement speed modifier to apply to the entity while it is drinking a potion. A value of 0 represents no change in speed.
   * @default 0 */
  speed_modifier?: number;
};
export type EntityDrinkpotiongoaldefinitionPotiondata = {
  /** The percent chance (from 0.0 to 1.0) of this potion being selected when searching for a potion to use.
   * @default 1 */
  chance?: number;
  /** The filters to use when determining if this potion can be selected. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The registry ID of the potion to use
   * @default -1 */
  id?: number;
};
export type EntityMinecraftBehaviorEatCarriedItem = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time in seconds the mob should wait before eating the item.
   * @default 0 */
  delay_before_eating?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorEndermanLeaveBlock = {
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorEndermanTakeBlock = {
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorFindCover = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time in seconds the mob has to wait before using the goal again
   * @default 0 */
  cooldown_time?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorFindMount = {
  /** If true, the mob will not go into water blocks when going towards a mount
  
  Sample values:
  • parrot: true
   * @default false */
  avoid_water?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Number of attempts to find mount
  
  Sample values:
  • drowned: 20
   * @default 20 */
  max_failed_attempts?: number;
  /** This is the distance the mob needs to be, in blocks, from the desired mount to mount it. If the value is below 0, the mob will use its default attack distance
  
  Sample values:
  • parrot: 2
   * @default -1 */
  mount_distance?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • drowned: 1
  • parrot: 4
   * @default 0 */
  priority?: number;
  /** Time the mob will wait before starting to move towards the mount
  
  Sample values:
  • drowned: 15
  • parrot: 100
   * @default 0 */
  start_delay?: number;
  /** If true, the mob will only look for a mount if it has a target
   * @default false */
  target_needed?: boolean;
  /** Distance in blocks within which the mob will look for a mount
  
  Sample values:
  • drowned: 16
   * @default 0 */
  within_radius?: number;
};
export type EntityMinecraftBehaviorFindUnderwaterTreasure = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • dolphin: 2
   * @default 0 */
  priority?: number;
  /** The range that the mob will search for a treasure chest within a ruin or shipwreck to move towards.
  
  Sample values:
  • dolphin: 30
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • dolphin: 2
   * @default 1 */
  speed_multiplier?: number;
  /** The distance the mob will move before stopping.
  
  Sample values:
  • dolphin: 50
   * @default 2 */
  stop_distance?: number;
};
export type EntityMinecraftBehaviorFleeSun = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • bogged: 2
  • parched: 3
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • bogged: 1
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorFloat = {
  /** Probability per tick (0-1) that the entity will attempt to float when in water. Lower values produce slower, more deliberate floating behavior.
  
  *Introduced in version 1.21.130*
   * @default 0.8 */
  chance_per_tick_to_float?: number;
  /** Time in seconds the entity must spend with its head underwater before any passengers are dismounted. A value of 0 dismounts passengers as soon as the entity's head submerges.
  
  *Introduced in version 1.21.130*
   * @default 0 */
  time_under_water_to_dismount_passengers?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • allay: 7
  • cave_spider: 1
   * @default 0 */
  priority?: number;
  /** If true, the mob will keep sinking as long as it has passengers.
   * @default false */
  sink_with_passengers?: boolean;
};
export type EntityMinecraftBehaviorFloatTempt = {
  /** If true, the mob can stop being tempted if the player moves too fast while close to this mob.
   * @default false */
  can_get_scared?: boolean;
  /** If true, vertical distance to the player will be considered when tempting.
   * @default false */
  can_tempt_vertically?: boolean;
  /** If true, the mob can be tempted even if it has a passenger (i.e. if being ridden).
   * @default false */
  can_tempt_while_ridden?: boolean;
  /** List of items that can tempt the mob.
   * @default "[]" */
  items?: string[];
  /** Range of random ticks to wait between tempt sounds. */
  sound_interval?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** Movement speed multiplier of the mob when using this AI Goal
   * @default 1 */
  speed_multiplier?: number;
  /** The distance at which the mob will stop following the player.
   * @default 1.5 */
  stop_distance?: number;
  /** Sound to play while the mob is being tempted. */
  tempt_sound?: string;
  /** Distance in blocks this mob can get tempted by a player holding an item they like.
   * @default 0 */
  within_radius?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorFloatWander = {
  /** Range of time in seconds the mob will float around before landing and choosing to do something else
  
  Sample values:
  • bat: [0.1,0.35] */
  float_duration?: number[] | number;
  /** If true, the mob will have an additional buffer zone around it to avoid collisions with blocks when picking a position to wander to.
   * @default false */
  additional_collision_buffer?: boolean;
  /** If true allows the mob to navigate through liquids on its way to the target position.
   * @default false */
  allow_navigating_through_liquids?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** If true, the MoveControl flag will be added to the behavior which means that it can no longer be active at the same time as other behaviors with MoveControl.
   * @default true */
  float_wander_has_move_control?: boolean;
  /** If true, the point has to be reachable to be a valid target
   * @default false */
  must_reach?: boolean;
  /** If true, will prioritize finding random positions in the vicinity of surfaces, i.e. blocks that are not Air or Liquid.
   * @default false */
  navigate_around_surface?: boolean;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** If true, the mob will randomly pick a new point while moving to the previously selected one
  
  Sample values:
  • bat: true
   * @default false */
  random_reselect?: boolean;
  /** The horizontal distance in blocks that the goal will check for a surface from a candidate position. Only valid when `navigate_around_surface` is true.
   * @default 8 */
  surface_xz_dist?: number;
  /** The vertical distance in blocks that the goal will check for a surface from a candidate position. Only valid when `navigate_around_surface` is true.
   * @default 8 */
  surface_y_dist?: number;
  /** If true, the mob will respect home position restrictions when choosing new target positions. If false, it will choose target position without considering home restrictions
   * @default true */
  use_home_position_restriction?: boolean;
  /** Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
  
  Sample values:
  • bat: 10
   * @default 10 */
  xz_dist?: number;
  /** Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
  
  Sample values:
  • bat: 7
   * @default 7 */
  y_dist?: number;
  /** Height in blocks to add to the selected target position
  
  Sample values:
  • bat: -2
   * @default 0 */
  y_offset?: number;
};
export type EntityMinecraftBehaviorFollowCaravan = {
  /** List of entity types that this mob can follow in a caravan. Can be a single filter object or an array of filter objects.
  
  Sample values:
  • llama: {"filters":{"test":"is_family","subject":"other... */
  entity_types?: ({
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** If true, the mob has to be visible to be a valid choice
       * @default false */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the running speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    }) | Array<Record<string, unknown>>;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Number of entities that can be in the caravan
  
  Sample values:
  • llama: 10
   * @default 1 */
  entity_count?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • llama: 3
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • llama: 2.1
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorFollowMob = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** If non-empty, provides criteria for filtering which nearby Mobs can be followed. If empty default criteria will be used, which will exclude Players, Squid variants, Fish variants, Tadpoles, Dolphins, and mobs of the same type as the owner of the Goal. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The type of actor to prefer following. If left unspecified, a random actor among those in range will be chosen.
   * @default "" */
  preferred_actor_type?: string;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • parrot: 4
   * @default 0 */
  priority?: number;
  /** The distance in blocks it will look for a mob to follow
  
  Sample values:
  • parrot: 20
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • parrot: 1
   * @default 1 */
  speed_multiplier?: number;
  /** The distance in blocks this mob stops from the mob it is following
  
  Sample values:
  • parrot: 3
   * @default 2 */
  stop_distance?: number;
  /** If true, the mob will respect the 'minecraft:home' component's 'restriction_radius' field when choosing a target to follow. If false, it will choose target position without considering home restrictions.
   * @default false */
  use_home_position_restriction?: boolean;
};
export type EntityMinecraftBehaviorFollowOwner = {
  /** Defines if the mob will teleport to its owner when too far away.
   * @default true */
  can_teleport?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Defines if the mob should disregard following its owner after detecting a recent vibration.
   * @default false */
  ignore_vibration?: boolean;
  /** The maximum distance the mob can be from its owner to start following it. Applicable only when "can_teleport" is set to false.
   * @default 60 */
  max_distance?: number;
  /** Defines how far (in blocks) the entity will be from its owner after teleporting. If not specified, it defaults to "stop_distance" + 1, allowing the entity to seamlessly resume navigation.
   * @default 3 */
  post_teleport_distance?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • allay: 6
  • parrot: 3
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • allay: 8
  • parrot: 1
   * @default 1 */
  speed_multiplier?: number;
  /** The minimum distance the mob must be from its owner to start following it.
  
  Sample values:
  • allay: 16
  • parrot: 5
   * @default 10 */
  start_distance?: number;
  /** The distance at which the mob will stop following its owner.
  
  Sample values:
  • allay: 4
  • parrot: 1
   * @default 2 */
  stop_distance?: number;
};
export type EntityMinecraftBehaviorFollowParent = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • chicken: 5
  • dolphin: 4
  • goat: 6
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • chicken: 1.1
  • goat: 1
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorFollowTargetCaptain = {
  /** Defines the distance in blocks the mob will stay from its target while following.
   * @default 0 */
  follow_distance?: number;
  /** Defines the maximum distance in blocks a mob can get from its target captain before giving up trying to follow it.
   * @default 0 */
  within_radius?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorHide = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Amount of time in seconds that the mob reacts.
   * @default 1 */
  duration?: number;
  /** Tells the goal what POI type it should be looking for */
  poi_type?: "bed" | "jobsite" | "meeting_area";
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
  /** The cooldown time in seconds before the goal can be reused after a internal failure or timeout condition.
   * @default 8 */
  timeout_cooldown?: number;
};
export type EntityMinecraftBehaviorHoldGround = {
  /** Event to run when target is within the radius. This event is broadcasted if broadcast is true. */
  within_radius_event?: string | EventRef;
  /** Whether to broadcast out the mob's target to other mobs of the same type.
   * @default false */
  broadcast?: boolean;
  /** Range in blocks for how far to broadcast.
   * @default 0 */
  broadcast_range?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Minimum distance the target must be for the mob to run this goal.
   * @default 10 */
  min_radius?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorHover = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Priority
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorHurtByTarget = {
  /** List of entity types that this mob can target when hurt by them
  
  Sample values:
  • bogged: [{"filters":{"operator":"!=","test":"is_family"...
  • breeze: [{"filters":{"all_of":[{"operator":"!=","test":... */
  entity_types?: (Array<{
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** If true, the mob has to be visible to be a valid choice
       * @default false */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the running speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    }>) | Record<string, unknown>;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** If true, the mob will hurt its owner and other mobs with the same owner as itself
   * @default false */
  hurt_owner?: boolean;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** If true, nearby mobs of the same type will be alerted about the damage
   * @default false */
  alert_same_type?: boolean;
};
export type EntityMinecraftBehaviorInspectBookshelf = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
   * @default 0.5 */
  goal_radius?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The number of randomly selected blocks each tick that the mob will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
   * @default 10 */
  search_count?: number;
  /** The height that the mob will search for bookshelves.
   * @default 1 */
  search_height?: number;
  /** The distance in blocks the mob will look for books to inspect.
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorLayDown = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** A random value to determine at what intervals something can occur. This has a 1/interval chance to choose this goal
   * @default 120 */
  interval?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** A random value in which the goal can use to pull out of the behavior. This is a 1/interval chance to stop laying down
   * @default 120 */
  random_stop_interval?: number;
};
export type EntityMinecraftBehaviorLayEgg = {
  /** Duration of the laying egg process in seconds.
  
  Sample values:
  • frog: 2
   * @default 10 */
  lay_seconds?: number;
  /** Allows the mob to lay its eggs from below the target if it can't get there. This is useful if the target block is water with air above, since mobs may not be able to get to the air block above water.
  
  Sample values:
  • frog: true
   * @default false */
  allow_laying_from_below?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Block type for the egg to lay. If this is a turtle egg, the number of eggs in the block is randomly set.
  
  Sample values:
  • frog: minecraft:frog_spawn
   * @default "minecraft:turtle_egg" */
  egg_type?: string;
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
  
  Sample values:
  • frog: 1.7
   * @default 0.5 */
  goal_radius?: number;
  /** Name of the sound event played when laying the egg. Defaults to lay_egg, which is used for Turtles.
  
  Sample values:
  • frog: lay_spawn
   * @default "lay_egg" */
  lay_egg_sound?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** Event to run when this mob lays the egg.
  
  Sample values:
  • frog: {"event":"laid_egg","target":"self"} */
  on_lay?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • frog: 2
   * @default 0 */
  priority?: number;
  /** The height in blocks the mob will look for the block to move towards.
  
  Sample values:
  • frog: 3
   * @default 1 */
  search_height?: number;
  /** The distance in blocks it will look for the block to move towards.
  
  Sample values:
  • frog: 10
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this goal.
  
  Sample values:
  • frog: 1
   * @default 1 */
  speed_multiplier?: number;
  /** Blocks that the mob can lay its eggs on top of.
  
  Sample values:
  • frog: ["minecraft:sand","minecraft:water"] */
  target_blocks?: string[];
  /** Types of materials that can exist above the target block. Valid types are Air, Water, and Lava.
  
  Sample values:
  • frog: ["air","air"] */
  target_materials_above_block?: string[];
  /** Specifies if the default lay-egg animation should be played when the egg is placed or not.
   * @default true */
  use_default_animation?: boolean;
};
export type EntityMinecraftBehaviorLeapAtTarget = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** If true, the mob will only jump at its target if its on the ground. Setting it to false will allow it to jump even if its already in the air
   * @default true */
  must_be_on_ground?: boolean;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • cave_spider: 4
   * @default 0 */
  priority?: number;
  /** Allows the actor to be set to persist upon targeting a player
   * @default false */
  set_persistent?: boolean;
  /** The height in blocks the mob jumps when leaping at its target
  
  Sample values:
  • cave_spider: 0.4
   * @default 0 */
  yd?: number;
};
export type EntityMinecraftBehaviorLookAtEntity = {
  /** The angle in degrees that the mob can see rotated on the Y-axis (left-right).
  
  Sample values:
  • ravager: 45
   * @default 360 */
  angle_of_view_horizontal?: number;
  /** The angle in degrees that the mob can see rotated on the X-axis (up-down).
   * @default 360 */
  angle_of_view_vertical?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Filter to determine the conditions for this mob to look at the entity
  
  Sample values:
  • evocation_illager: {"test":"is_family","subject":"other","value":"... */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The distance in blocks from which the entity will look at the nearest entity.
  
  Sample values:
  • evocation_illager: 8
  • vex: 6
   * @default 8 */
  look_distance?: number;
  /** Time range to look at the nearest entity. */
  look_time?: number | [number, number] | Floatrange;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • evocation_illager: 10
  • vex: 9
   * @default 0 */
  priority?: number;
  /** The probability of looking at the target. A value of 1.00 is 100%.
  
  Sample values:
  • vex: 0.02
   * @default 0.019999999552965164 */
  probability?: number;
};
export type Floatrange = {
  /** Max
   * @default 0 */
  max?: number;
  /** Min
   * @default 0 */
  min?: number;
};
export type EntityMinecraftBehaviorLookAtPlayer = {
  /** The angle in degrees that the mob can see rotated on the Y-axis (left-right).
  
  Sample values:
  • ravager: 45
   * @default 360 */
  angle_of_view_horizontal?: number;
  /** The angle in degrees that the mob can see rotated on the X-axis (up-down).
   * @default 360 */
  angle_of_view_vertical?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The distance in blocks from which the entity will look at the nearest entity.
  
  Sample values:
  • bogged: 8
  • breeze: 16
  • cave_spider: 6
   * @default 8 */
  look_distance?: number;
  /** Time range to look at the nearest entity.
  
  Sample values:
  • zombie_horse: [2,4]
  • campghost: [0,100] */
  look_time?: number | [number, number] | Floatrange;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • allay: 8
  • armadillo: 7
  • axolotl: 10
   * @default 0 */
  priority?: number;
  /** The probability of looking at the target. A value of 1.00 is 100%.
  
  Sample values:
  • allay: 0.02
  • elder_guardian: 0.01
  • enderman: 8
   * @default 0.019999999552965164 */
  probability?: number;
  /** 
  
  Sample values:
  • allay: 6 */
  target_distance?: number;
  /** 
  
  Sample values:
  • armadillo: 40 */
  min_look_time?: number;
  /** 
  
  Sample values:
  • armadillo: 80 */
  max_look_time?: number;
};
export type EntityMinecraftBehaviorLookAtTarget = {
  /** The angle in degrees that the mob can see rotated on the Y-axis (left-right).
   * @default 360 */
  angle_of_view_horizontal?: number;
  /** The angle in degrees that the mob can see rotated on the X-axis (up-down).
   * @default 360 */
  angle_of_view_vertical?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The distance in blocks from which the entity will look at the nearest entity.
  
  Sample values:
  • axe_turret.behavior: 12
  • bow_turret.behavior: 19
  • crossbow_turret.behavior: 15
   * @default 8 */
  look_distance?: number;
  /** Time range to look at the nearest entity.
  
  Sample values:
  • axe_turret.behavior: [1,5] */
  look_time?: number | [number, number] | Floatrange;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • wither: 5
  • axe_turret.behavior: 2
  • bow_turret.behavior: 1
   * @default 0 */
  priority?: number;
  /** The probability of looking at the target. A value of 1.00 is 100%.
  
  Sample values:
  • axe_turret.behavior: 1
   * @default 0.019999999552965164 */
  probability?: number;
};
export type EntityMinecraftBehaviorLookAtTradingPlayer = {
  /** The angle in degrees that the mob can see rotated on the Y-axis (left-right).
   * @default 360 */
  angle_of_view_horizontal?: number;
  /** The angle in degrees that the mob can see rotated on the X-axis (up-down).
   * @default 360 */
  angle_of_view_vertical?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The distance in blocks from which the entity will look at the nearest entity.
   * @default 8 */
  look_distance?: number;
  /** Time range to look at the nearest entity. */
  look_time?: number | [number, number] | Floatrange;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • villager: 2
  • villager_v2: 7
  • wandering_trader: 4
   * @default 0 */
  priority?: number;
  /** The probability of looking at the target. A value of 1.00 is 100%.
   * @default 0.019999999552965164 */
  probability?: number;
};
export type EntityMinecraftBehaviorMakeLove = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorMingle = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time in seconds the mob has to wait before using the goal again
   * @default 0 */
  cooldown_time?: number;
  /** Amount of time in seconds that the entity will chat with another entity
   * @default 1 */
  duration?: number;
  /** The distance from its partner that this entity will mingle. If the entity type is not the same as the entity, this value needs to be identical on both entities.
   * @default 2 */
  mingle_distance?: number;
  /** The entity type that this entity is allowed to mingle with
   * @default "" */
  mingle_partner_type?: string;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorMountPathing = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • cave_spider: 5
  • chicken: 2
  • llama: 1
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • cave_spider: 1.25
  • chicken: 1.5
   * @default 1 */
  speed_multiplier?: number;
  /** The distance at which this mob wants to be away from its target
   * @default 0 */
  target_dist?: number;
  /** If true, this mob will chase after the target as long as it's a valid target
  
  Sample values:
  • cave_spider: true
   * @default false */
  track_target?: boolean;
};
export type EntityMinecraftBehaviorMoveThroughVillage = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** If true, the mob will only move through the village during night time
  
  Sample values:
  • iron_golem: true
   * @default false */
  only_at_night?: boolean;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • iron_golem: 3
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • iron_golem: 0.6
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorMoveToBlock = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
   * @default 0.5 */
  goal_radius?: number;
  /** Event to run on block reached. */
  on_reach?: EntityActordefinitiontrigger[];
  /** Event to run on completing a stay of stay_duration at the block. */
  on_stay_completed?: EntityActordefinitiontrigger[];
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The height in blocks that the mob will look for the block.
   * @default 1 */
  search_height?: number;
  /** The distance in blocks that the mob will look for the block.
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this AI Goal.
   * @default 1 */
  speed_multiplier?: number;
  /** Chance to start the behavior (applied after each random tick_interval).
   * @default 1 */
  start_chance?: number;
  /** Number of ticks needed to complete a stay at the block.
   * @default 0 */
  stay_duration?: number;
  /** Conditions that need to be met for a block to be a valid target. */
  target_block_filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Block types to move to. */
  target_blocks?: string | ({
      [key: string]: string;
    });
  /** Offset to add to the selected target position. */
  target_offset?: number[] | ({
      /** X
       * @default 0 */
      x?: number;
      /** Y
       * @default 0 */
      y?: number;
      /** Z
       * @default 0 */
      z?: number;
    });
  /** Kind of block to find fitting the specification. Valid values are "random" and "nearest".
   * @default "nearest" */
  target_selection_method?: "nearest" | "random";
  /** Average interval in ticks to try to run this behavior.
   * @default 20 */
  tick_interval?: number;
};
export type EntityMinecraftBehaviorMoveToLand = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
  
  Sample values:
  • frog: 2
   * @default 0.5 */
  goal_radius?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • frog: 6
   * @default 0 */
  priority?: number;
  /** The number of randomly selected blocks each tick that the mob will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
  
  Sample values:
  • frog: 80
   * @default 10 */
  search_count?: number;
  /** Height in blocks the mob will look for land to move towards
  
  Sample values:
  • frog: 8
   * @default 1 */
  search_height?: number;
  /** The distance in blocks it will look for land to move towards
  
  Sample values:
  • frog: 30
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorMoveToLava = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
   * @default 0.5 */
  goal_radius?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The number of randomly selected blocks each tick that the mob will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
   * @default 10 */
  search_count?: number;
  /** Height in blocks the mob will look for lava to move towards
   * @default 1 */
  search_height?: number;
  /** The distance in blocks it will look for lava to move towards
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorMoveToLiquid = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
  
  Sample values:
  • strider: 0.9
   * @default 0.5 */
  goal_radius?: number;
  /** The material type of the liquid block to find. Valid values are "Any", "Water", and "Lava".
  
  Sample values:
  • strider: Lava
   * @default "any" */
  material_type?: "Any" | "Lava" | "Water";
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • strider: 7
   * @default 0 */
  priority?: number;
  /** The number of randomly selected blocks each tick that the mob will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
  
  Sample values:
  • strider: 30
   * @default 10 */
  search_count?: number;
  /** Height in blocks the mob will look for the liquid block to move towards
  
  Sample values:
  • strider: 10
   * @default 1 */
  search_height?: number;
  /** The distance in blocks it will look for the liquid block to move towards
  
  Sample values:
  • strider: 16
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorMoveToPoi = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Tells the goal what POI type it should be looking for */
  poi_type?: "bed" | "jobsite" | "meeting_area";
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorMoveToRandomBlock = {
  /** Defines the distance from the mob, in blocks, that the block to move to will be chosen.
   * @default 16 */
  block_distance?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
   * @default 1 */
  speed_multiplier?: number;
  /** Defines the distance in blocks the mob has to be from the block for the movement to be finished.
   * @default 0 */
  within_radius?: number;
};
export type EntityMinecraftBehaviorMoveToVillage = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time in seconds the mob has to wait before using the goal again
   * @default 8 */
  cooldown_time?: number;
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
   * @default 1.5 */
  goal_radius?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The distance in blocks to search for villages. If <= 0, find the closest village regardless of distance.
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorMoveToWater = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
  
  Sample values:
  • frog: 1.5
   * @default 0.5 */
  goal_radius?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • dolphin: 1
  • frog: 3
   * @default 0 */
  priority?: number;
  /** The number of randomly selected blocks each tick that the mob will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
   * @default 10 */
  search_count?: number;
  /** Height in blocks the mob will look for water to move towards
  
  Sample values:
  • dolphin: 5
   * @default 1 */
  search_height?: number;
  /** The distance in blocks it will look for water to move towards
  
  Sample values:
  • dolphin: 15
  • frog: 20
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorMoveTowardsTarget = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • iron_golem: 2
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • iron_golem: 0.9
   * @default 1 */
  speed_multiplier?: number;
  /** Defines the radius in blocks that the mob tries to be from the target. A value of 0 means it tries to occupy the same block as the target
  
  Sample values:
  • iron_golem: 32
   * @default 0 */
  within_radius?: number;
};
export type EntityMinecraftBehaviorNap = {
  /** Conditions that need to be met for the entity to nap. */
  can_nap_filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | (Array<{
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }>) | ({
      all_of?: Array<{
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }>;
      any_of?: Array<{
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }>;
      none_of?: Array<{
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }>;
    });
  /** Filters for mobs that will not wake this entity from napping. */
  wake_mob_exceptions?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | (Array<{
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }>) | ({
      all_of?: Array<{
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }>;
      any_of?: Array<{
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }>;
      none_of?: Array<{
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }>;
    });
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Maximum time in seconds the mob has to wait before using the goal again
   * @default 0 */
  cooldown_max?: number;
  /** Minimum time in seconds the mob has to wait before using the goal again
   * @default 0 */
  cooldown_min?: number;
  /** The block distance in x and z that will be checked for mobs that this mob detects
   * @default 6 */
  mob_detect_dist?: number;
  /** The block distance in y that will be checked for mobs that this mob detects
   * @default 6 */
  mob_detect_height?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorNearestAttackableTarget = {
  "attack_interval|attack_interval_min"?: string;
  /** Time range (in seconds) between searching for an attack target, range is in (0, "attack_interval"]. Only used if "attack_interval" is greater than 0, otherwise "scan_interval" is used.
  
  Sample values:
  • cave_spider: {"min":10,"max":10}
  • cave_spider: {"min":5,"max":5} */
  attack_interval?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** List of entity types that this mob considers valid targets
  
  Sample values:
  • blaze: [{"filters":{"AND":[{"test":"is_family","subjec...
  • bogged: [{"filters":{"test":"is_family","subject":"othe...
  • cave_spider: [{"filters":{"any_of":[{"test":"is_family","sub... */
  entity_types?: (Array<{
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** If true, the mob has to be visible to be a valid choice
       * @default false */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** If true, the targeting entity will continuously reevaluate the target and stop attacking if the target no longer meets the filter conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the running speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
      /** Priority */
      priority?: number;
    }>) | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** Probability (0-1) that the goal will succeed when a candidate target passes all filters. Lower values cause the mob to acquire targets less reliably; the default of 1 always acquires.
  
  *Introduced in version 1.21.130*
   * @default 1 */
  target_acquisition_probability?: number;
  /** If true, this entity can attack its owner.
   * @default false */
  attack_owner?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** If true, this entity requires a path to the target.
   * @default false */
  must_reach?: boolean;
  /** Determines if target-validity requires this entity to be in range only, or both in range and in sight.
  
  Sample values:
  • blaze: true
   * @default false */
  must_see?: boolean;
  /** Time (in seconds) the target must not be seen by this entity to become invalid. Used only if "must_see" is true.
  
  Sample values:
  • drowned: 17
   * @default 3 */
  must_see_forget_duration?: number;
  /** Time (in seconds) this entity can continue attacking the target after the target is no longer valid.
  
  Sample values:
  • drowned: 0.5
   * @default 0 */
  persist_time?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • blaze: 2
  • breeze: 1
   * @default 0 */
  priority?: number;
  /** Allows the attacking entity to update the nearest target, otherwise a target is only reselected after each "scan_interval" or "attack_interval".
  
  Sample values:
  • bogged: true
   * @default false */
  reselect_targets?: boolean;
  /** If "attack_interval" is 0 or isn't declared, then between attacks: scanning for a new target occurs every amount of ticks equal to "scan_interval", minimum value is 1. Values under 10 can affect performance.
   * @default 10 */
  scan_interval?: number;
  /** Allows the actor to be set to persist upon targeting a player
   * @default false */
  set_persistent?: boolean;
  /** Multiplied with the target's armor coverage percentage to modify "max_dist" when detecting an invisible target.
   * @default 0.699999988079071 */
  target_invisible_multiplier?: number;
  /** Maximum vertical target-search distance, if it's greater than the target type's "max_dist". A negative value defaults to "entity_types" greatest "max_dist".
   * @default -1 */
  target_search_height?: number;
  /** Multiplied with the target type's "max_dist" when trying to detect a sneaking target.
   * @default 0.800000011920929 */
  target_sneak_visibility_multiplier?: number;
  /** Maximum distance this entity can be from the target when following it, otherwise the target becomes invalid. This value is only used if the entity doesn't declare "minecraft:follow_range".
  
  Sample values:
  • breeze: 24
  • drowned: 12
   * @default 0 */
  within_radius?: number;
};
export type EntityMinecraftBehaviorNearestPrioritizedAttackableTarget = {
  /** Time in seconds before selecting a target
   * @default 0 */
  attack_interval?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** List of entity types that this mob considers valid targets */
  entity_types?: (Array<{
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** If true, the mob has to be visible to be a valid choice
       * @default false */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the running speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    }>) | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** If true, this mob will also attack mobs that hurt its owner.
   * @default false */
  hurt_owner?: boolean;
  /** If true, only entities that this mob can path to can be selected as targets
   * @default false */
  must_reach?: boolean;
  /** If true, only entities in this mob's viewing range can be selected as targets
   * @default false */
  must_see?: boolean;
  /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
   * @default 3 */
  must_see_forget_duration?: number;
  /** Time in seconds for a valid target to stay targeted when it becomes an invalid target.
   * @default 0 */
  persist_time?: number;
  /** Specifies the priority in which filtered enemy types should be attacked. Lower number means higher priority.
   * @default 0 */
  priority?: number;
  /** If true, the target will change to the current closest entity whenever a different entity is closer
   * @default false */
  reselect_targets?: boolean;
  /** How many ticks to wait between scanning for a target.
   * @default 10 */
  scan_interval?: number;
  /** Allows the actor to be set to persist upon targeting a player
   * @default false */
  set_persistent?: boolean;
  /** Height in blocks to search for a target mob. -1.0f means the height does not matter.
   * @default -1 */
  target_search_height?: number;
  /** Distance in blocks that the target can be within to launch an attack
   * @default 0 */
  within_radius?: number;
  /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
   * @default 0 */
  cooldown?: number;
};
export type EntityMinecraftBehaviorOcelotSitOnBlock = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorOpenDoor = {
  /** If true, the mob will close the door after opening it and going through it.
   * @default true */
  close_door_after?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorOwnerHurtByTarget = {
  /** List of entity types that this mob can target if they hurt their owner */
  entity_types?: (Array<{
      /** If true, the targeting entity will continuously reevaluate the target and stop attacking if the target no longer meets the filter conditions.
       * @default false */
      reevaluate_description?: boolean;
    }>) | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorOwnerHurtTarget = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** List of entity types that this entity can target if the potential target is hurt by this mob's owner */
  entity_types?: (Array<{
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** If true, the mob has to be visible to be a valid choice
       * @default false */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the running speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    }>) | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorPanic = {
  /** The list of Entity Damage Sources that will cause this mob to panic
   * @default "[campfire, fire, fire_tick, freezing, lava, lightning, magma, soul_campfire, temperature, entity_attack, entity_explosion, fireworks, magic, projectile, ram_attack, sonic_boom, wither, mace_smash]" */
  damage_sources?: string[];
  /** If true, this mob will not stop panicking until it can't move anymore or the goal is removed from it
   * @default false */
  force?: boolean;
  /** If true, the mob will not panic in response to damage from other mobs. This overrides the damage types in "damage_sources"
   * @default false */
  ignore_mob_damage?: boolean;
  /** If true, the mob will prefer water over land
   * @default false */
  prefer_water?: boolean;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • allay: 2
  • chicken: 1.5
  • cow: 1.25
   * @default 1 */
  speed_multiplier?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorPetSleepWithOwner = {
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot
   * @default 0.5 */
  goal_radius?: number;
  /** Height in blocks from the owner the pet can be to sleep with owner.
   * @default 1 */
  search_height?: number;
  /** The distance in blocks from the owner the pet can be to sleep with owner.
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
   * @default 1 */
  speed_multiplier?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorPickupItems = {
  /** If true, the mob will only pick up items that match what it is already holding.
  
  Sample values:
  • allay: true
   * @default false */
  pickup_same_items_as_in_hand?: boolean;
  /** If true, the mob will not begin a pickup goal while it is already holding an item. Useful for mobs that should only hold one item at a time.
  
  *Introduced in version 1.26.30*
   * @default false */
  stop_if_holding_item?: boolean;
  /** Event to run when this mob moves to pick up an item.
  
  *Introduced in version 1.26.20* */
  on_pickup_item_start?: string | EntityActordefinitiontrigger;
  /** Event to run when this mob either finishes or loses interest in picking up an item.
  
  *Introduced in version 1.26.20* */
  on_pickup_item_end?: string | EntityActordefinitiontrigger;
  /** If true, the mob can pick up any item
  
  Sample values:
  • bogged: true
   * @default false */
  can_pickup_any_item?: boolean;
  /** If true, the mob can pick up items to its hand or armor slots
   * @default true */
  can_pickup_to_hand_or_equipment?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time in seconds the mob cannot pickup items after being attacked
   * @default 0 */
  cooldown_after_being_attacked?: number;
  /** List of items this mob will not pick up
  
  Sample values:
  • bogged: [{"tags":"q.all_tags('minecraft:is_spear')"}]
  • drowned: [{"name":"minecraft:glow_ink_sac"},{"tags":"q.a... */
  excluded_items?: string | ({
      [key: string]: string;
    });
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot
  
  Sample values:
  • allay: 2.2
  • bogged: 2
   * @default 0.5 */
  goal_radius?: number;
  /** Maximum distance this mob will look for items to pick up
  
  Sample values:
  • allay: 32
  • bogged: 3
   * @default 1 */
  max_dist?: number;
  /** If true, depending on the difficulty, there is a random chance that the mob may not be able to pickup items
  
  Sample values:
  • bogged: true
   * @default false */
  pickup_based_on_chance?: boolean;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • allay: 2
  • bogged: 5
  • drowned: 6
   * @default 0 */
  priority?: number;
  /** Height in blocks the mob will search for items
  
  Sample values:
  • allay: 32
   * @default 1 */
  search_height?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • allay: 6
  • bogged: 1
   * @default 1 */
  speed_multiplier?: number;
  /** If true, this mob will chase after the target as long as it's a valid target
   * @default false */
  track_target?: boolean;
};
export type EntityMinecraftBehaviorPlayerRideTamed = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorRaidGarden = {
  /** Blocks that the mob is looking for to eat/raid */
  blocks?: string[];
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time in seconds between each time it eats/raids
   * @default 2 */
  eat_delay?: number;
  /** Amount of time in seconds before this mob wants to eat/raid again after eating its maximum
   * @default 100 */
  full_delay?: number;
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
   * @default 0.5 */
  goal_radius?: number;
  /** Time in seconds before starting to eat/raid once it arrives at it
   * @default 0 */
  initial_eat_delay?: number;
  /** Maximum number of crops this entity wants to eat/raid. If set to zero or less then it doesn't have a maximum
   * @default 6 */
  max_to_eat?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Height in blocks the mob will look for crops to eat
   * @default 1 */
  search_height?: number;
  /** Distance in blocks the mob will look for crops to eat
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorRandomBreach = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time in seconds the mob has to wait before using the goal again
  
  Sample values:
  • dolphin: 2
   * @default 0 */
  cooldown_time?: number;
  /** A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
  
  Sample values:
  • dolphin: 50
   * @default 120 */
  interval?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • dolphin: 6
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
   * @default 1 */
  speed_multiplier?: number;
  /** Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
  
  Sample values:
  • dolphin: 6
   * @default 10 */
  xz_dist?: number;
  /** Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
   * @default 7 */
  y_dist?: number;
};
export type EntityMinecraftBehaviorRandomFly = {
  /** If true, the mob will avoid blocks that cause damage when flying.
  
  Sample values:
  • parrot: true */
  avoid_damage_blocks?: boolean;
  /** If true, the mob can stop flying and land on a tree instead of the ground
  
  Sample values:
  • parrot: true
   * @default true */
  can_land_on_trees?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • parrot: 3
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • parrot: 1
   * @default 1 */
  speed_multiplier?: number;
  /** Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
  
  Sample values:
  • parrot: 15
   * @default 10 */
  xz_dist?: number;
  /** Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
  
  Sample values:
  • parrot: 1
   * @default 7 */
  y_dist?: number;
  /** y Offset */
  y_offset?: number;
};
export type EntityMinecraftBehaviorRandomHover = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The height above the surface which the mob will try to maintain
  
  Sample values:
  • allay: [1,4] */
  hover_height?: number | [number, number] | Intrange;
  /** A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
  
  Sample values:
  • allay: 1
   * @default 120 */
  interval?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • allay: 9
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
   * @default 1 */
  speed_multiplier?: number;
  /** Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
  
  Sample values:
  • allay: 8
   * @default 10 */
  xz_dist?: number;
  /** Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
  
  Sample values:
  • allay: 8
   * @default 7 */
  y_dist?: number;
  /** Height in blocks to add to the selected target position
  
  Sample values:
  • allay: -1
   * @default 0 */
  y_offset?: number;
};
export type EntityMinecraftBehaviorRandomLookAround = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The range of time in seconds the mob will stay looking in a random direction before looking elsewhere */
  look_time?: number | [number, number] | Intrange;
  /** The rightmost angle a mob can look at on the horizontal plane with respect to its initial facing direction.
   * @default 180 */
  max_angle_of_view_horizontal?: number;
  /** The leftmost angle a mob can look at on the horizontal plane with respect to its initial facing direction.
   * @default -180 */
  min_angle_of_view_horizontal?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • allay: 8
  • blaze: 5
  • cave_spider: 7
   * @default 0 */
  priority?: number;
  /** The probability of randomly looking around.
   * @default 0.019999999552965164 */
  probability?: number;
};
export type EntityMinecraftBehaviorRandomLookAroundAndSit = {
  /** If the goal should continue to be used as long as the mob is leashed.
   * @default false */
  continue_if_leashed?: boolean;
  /** The mob will stay sitting on reload.
   * @default false */
  continue_sitting_on_reload?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The rightmost angle a mob can look at on the horizontal plane with respect to its initial facing direction.
   * @default 180 */
  max_angle_of_view_horizontal?: number;
  /** The max amount of unique looks a mob will have while looking around.
   * @default 2 */
  max_look_count?: number;
  /** The max amount of time (in ticks) a mob will stay looking at a direction while looking around.
   * @default 40 */
  max_look_time?: number;
  /** The leftmost angle a mob can look at on the horizontal plane with respect to its initial facing direction.
   * @default -180 */
  min_angle_of_view_horizontal?: number;
  /** The min amount of unique looks a mob will have while looking around.
   * @default 1 */
  min_look_count?: number;
  /** The min amount of time (in ticks) a mob will stay looking at a direction while looking around.
   * @default 20 */
  min_look_time?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The probability of randomly looking around.
   * @default 0.019999999552965164 */
  probability?: number;
  /** The cooldown in seconds before the goal can be used again.
   * @default 0 */
  random_look_around_cooldown?: number;
};
export type EntityMinecraftBehaviorRandomSitting = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time in seconds the mob has to wait before using the goal again
   * @default 100 */
  cooldown?: number;
  /** The minimum amount of time in seconds before the mob will stand back up
   * @default 10 */
  min_sit_time?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** This is the chance that the mob will start this goal, from 0 to 1
   * @default 0.10000000149011612 */
  start_chance?: number;
  /** This is the chance that the mob will stop this goal, from 0 to 1
   * @default 0.30000001192092896 */
  stop_chance?: number;
  /** Time in seconds the mob has to wait before using the goal again
   * @default 0 */
  cooldown_time?: number;
};
export type EntityMinecraftBehaviorRandomStroll = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
   * @default 120 */
  interval?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • blaze: 4
  • bogged: 6
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • blaze: 1
  • cave_spider: 0.8
   * @default 1 */
  speed_multiplier?: number;
  /** Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
   * @default 10 */
  xz_dist?: number;
  /** Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
   * @default 7 */
  y_dist?: number;
};
export type EntityMinecraftBehaviorRandomSwim = {
  /** If true, the mob will avoid surface water blocks by swimming below them
   * @default true */
  avoid_surface?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
  
  Sample values:
  • guardian: 80
   * @default 120 */
  interval?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • dolphin: 5
  • elder_guardian: 7
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • elder_guardian: 0.5
  • guardian: 1
   * @default 1 */
  speed_multiplier?: number;
  /** Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
  
  Sample values:
  • dolphin: 20
   * @default 10 */
  xz_dist?: number;
  /** Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
   * @default 7 */
  y_dist?: number;
};
export type EntityMinecraftBehaviorReceiveLove = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorRestrictOpenDoor = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorRestrictSun = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorRiseToLiquidLevel = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Target distance down from the liquid surface. i.e. Positive values move the target Y down.
  
  Sample values:
  • strider: 0.25
   * @default 0 */
  liquid_y_offset?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Movement up in Y per tick when below the liquid surface.
  
  Sample values:
  • strider: 0.01
   * @default 0 */
  rise_delta?: number;
  /** Movement down in Y per tick when above the liquid surface.
  
  Sample values:
  • strider: 0.01
   * @default 0 */
  sink_delta?: number;
};
export type EntityMinecraftBehaviorRoll = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The probability that the mob will use the goal.
   * @default 0.019999999552965164 */
  probability?: number;
};
export type EntityMinecraftBehaviorRunAroundLikeCrazy = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • llama: 1
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • llama: 1.2
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorScared = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The interval in which a sound will play when active in a 1/delay chance to kick off.
   * @default 0 */
  sound_delay?: number;
  /** The interval in which a sound will play when active in a 1/delay chance to kick off
   * @default 0 */
  sound_interval?: number;
};
export type EntityMinecraftBehaviorSendEvent = {
  /** List of possible events to send with conditions, weights, and targeting parameters. */
  event_choices?: Array<{
      /** Minimum distance from target to activate this event choice. */
      min_activation_range?: number;
      /** Maximum distance from target to activate this event choice. */
      max_activation_range?: number;
      /** Time in seconds before this choice can be used again. */
      cooldown_time?: number;
      /** Time in seconds for the casting animation. */
      cast_duration?: number;
      /** Color of particles during casting, in hex format like '#RRGGBBAA'. */
      particle_color?: string;
      /** Relative weight for random selection among event choices. */
      weight?: number;
      /** Conditions that must be met for this event choice to be valid. */
      filters?: Record<string, unknown>;
      /** Sound event to play when casting starts. */
      start_sound_event?: string;
      /** List of events to send in order with timing. */
      sequence?: Array<{
          /** Delay in seconds before this step executes. */
          base_delay?: number;
          /** Event to send to the target entity. */
          event?: string | EventRef;
          /** Sound event to play when this step executes. */
          sound_event?: string;
        }>;
    }>;
  /** Time in seconds for the entire event sending process */
  cast_duration?: number;
  /** If true, the mob will face the entity it sends an event to
   * @default true */
  look_at_target?: boolean;
  /** List of events to send */
  sequence?: Array<{
      /** Amount of time in seconds before starting this step
       * @default 0 */
      base_delay?: number;
      /** The event to send to the entity */
      event?: string | EventRef | ({
          event?: string | EventRef;
          target?: string;
        });
      /** The sound event to play when this step happens */
      sound_event?: string | ({
          event?: string | EventRef;
          target?: string;
        });
    }>;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorShareItems = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** List of entities this mob will share items with */
  entity_types?: (Array<{
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** If true, the mob has to be visible to be a valid choice
       * @default false */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the running speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    }>) | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot
   * @default 0.5 */
  goal_radius?: number;
  /** Maximum distance in blocks this mob will look for entities to share items with
   * @default 1 */
  max_dist?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorSilverfishMergeWithStone = {
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorSilverfishWakeUpFriends = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • silverfish: 1
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorSkeletonHorseTrap = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Amount of time in seconds the trap exists. After this amount of time is elapsed, the trap is removed from the world if it hasn't been activated
   * @default 1 */
  duration?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Distance in blocks that the player has to be within to trigger the horse trap.
   * @default 0 */
  within_radius?: number;
};
export type EntityMinecraftBehaviorSleep = {
  /** If true, the mob will be able to use the sleep goal if riding something
   * @default false */
  can_sleep_while_riding?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time in seconds the mob has to wait before using the goal again
   * @default 0 */
  cooldown_time?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The height of the mob's collider while sleeping
   * @default 1 */
  sleep_collider_height?: number;
  /** The width of the mob's collider while sleeping
   * @default 1 */
  sleep_collider_width?: number;
  /** The y offset of the mob's collider while sleeping
   * @default 1 */
  sleep_y_offset?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
  /** The cooldown time in seconds before the goal can be reused after a internal failure or timeout condition.
   * @default 8 */
  timeout_cooldown?: number;
};
export type EntityMinecraftBehaviorSnacking = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Items that we are interested in snacking on */
  items?: string | ({
      [key: string]: string;
    });
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The cooldown time in seconds before the mob is able to snack again
   * @default 7.5 */
  snacking_cooldown?: number;
  /** The minimum time in seconds before the mob is able to snack again
   * @default 0.5 */
  snacking_cooldown_min?: number;
  /** This is the chance that the mob will stop snacking, from 0 to 1
   * @default 0.0016666667070239782 */
  snacking_stop_chance?: number;
};
export type EntityMinecraftBehaviorSneeze = {
  /** Sound to play when the sneeze occurs.
   * @default "" */
  sound?: string;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time in seconds the mob has to wait before using the goal again
   * @default 0 */
  cooldown_time?: number;
  /** The probability that the mob will drop an item when it sneezes.
   * @default 1 */
  drop_item_chance?: number;
  /** List of entity types this mob will startle (cause to jump) when it sneezes. */
  entity_types?: (Array<{
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** If true, the mob has to be visible to be a valid choice
       * @default false */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the running speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    }>) | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** Loot table to select dropped items from.
   * @default "" */
  loot_table?: string;
  /** Sound to play when the sneeze is about to happen.
   * @default "" */
  prepare_sound?: string;
  /** The time in seconds that the mob takes to prepare to sneeze (while the prepare_sound is playing).
   * @default 1 */
  prepare_time?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The probability of sneezing. A value of 1.00 is 100%
   * @default 0.019999999552965164 */
  probability?: number;
  /** Distance in blocks that mobs will be startled.
   * @default 0 */
  within_radius?: number;
};
export type EntityMinecraftBehaviorSquidDive = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorSquidFlee = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorSquidIdle = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorSquidMoveAwayFromGround = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorSquidOutOfWater = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorStalkAndPounceOnTarget = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The amount of time the mob will be interested before pouncing. This happens when the mob is within range of pouncing
   * @default 2 */
  interest_time?: number;
  /** The distance in blocks the mob jumps in the direction of its target
   * @default 0.800000011920929 */
  leap_dist?: number;
  /** The height in blocks the mob jumps when leaping at its target
   * @default 0.8999999761581421 */
  leap_height?: number;
  /** The maximum distance away a target can be before the mob gives up on stalking
   * @default 10 */
  max_stalk_dist?: number;
  /** The maximum distance away from the target in blocks to begin pouncing at the target
   * @default 5 */
  pounce_max_dist?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Allows the actor to be set to persist upon targeting a player
   * @default false */
  set_persistent?: boolean;
  /** The movement speed in which you stalk your target
   * @default 1.2000000476837158 */
  stalk_speed?: number;
  /** The max distance away from the target when landing from the pounce that will still result in damaging the target
   * @default 2 */
  strike_dist?: number;
  /** Blocks that the mob can get stuck in after a pounce. */
  stuck_blocks?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The amount of time the mob will be stuck if they fail and land on a block they can be stuck on
   * @default 2 */
  stuck_time?: number;
  /** The distance in blocks the mob jumps in the direction of its target
   * @default 0.8 */
  leap_distance?: number;
};
export type EntityMinecraftBehaviorStayWhileSitting = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • parrot: 2
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorStompTurtleEgg = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
  
  Sample values:
  • drowned: 1.14
   * @default 0.5 */
  goal_radius?: number;
  /** A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
  
  Sample values:
  • drowned: 20
   * @default 120 */
  interval?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • drowned: 4
   * @default 0 */
  priority?: number;
  /** The number of randomly selected blocks each tick that the mob will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
   * @default 10 */
  search_count?: number;
  /** Height in blocks the mob will look for turtle eggs to move towards
  
  Sample values:
  • drowned: 2
   * @default 1 */
  search_height?: number;
  /** The distance in blocks it will look for turtle eggs to move towards
  
  Sample values:
  • drowned: 10
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this goal.
  
  Sample values:
  • drowned: 1
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorStrollTowardsVillage = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time in seconds the mob has to wait before using the goal again
   * @default 8 */
  cooldown_time?: number;
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
   * @default 1.5 */
  goal_radius?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The distance in blocks to search for villages. If <= 0, find the closest village regardless of distance.
   * @default 0 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
  /** Chance that the mob will start this goal, from 0 to 1.
   * @default 1 */
  start_chance?: number;
};
export type EntityMinecraftBehaviorSummonEntity = {
  /** List of spells for the mob to use to summon entities. */
  summon_choices?: EntitySummonactorgoaldefinitionSpelldata[];
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntitySummonactorgoaldefinitionSpelldata = {
  /** Time in seconds the spell casting will take
   * @default -1 */
  cast_duration?: number;
  /** Time in seconds the mob has to wait before using the spell again
   * @default 0 */
  cooldown_time?: number;
  /** If true, the mob will do the casting animations and render spell particles
   * @default true */
  do_casting?: boolean;
  /** Filters allow data objects to specify test criteria which allows their use. Filters can be defined by a single object of type (Filter Test), an array of tests, collection groups, or a combination of these objects. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Upper bound of the activation distance in blocks for this spell, must not be negative.
   * @default 32 */
  max_activation_range?: number;
  /** Lower bound of the activation distance in blocks for this spell, must not be negative.
   * @default 1 */
  min_activation_range?: number;
  /** The color of the particles for this spell */
  particle_color?: string | number[];
  /** List of steps for the spell. Each step has the following parameters: */
  sequence?: EntitySummonactorgoaldefinitionSpellstage[];
  /** The sound event to play when using this spell
   * @default "undefined" */
  start_sound_event?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** The weight of this spell. Controls how likely the mob is to choose this spell when casting one
   * @default 0 */
  weight?: number;
};
export type EntitySummonactorgoaldefinitionSpellstage = {
  /** Amount of time in seconds to wait before this step starts
   * @default 0 */
  base_delay?: number;
  /** Amount of time in seconds before each entity is summoned in this step
   * @default 0 */
  delay_per_summon?: number;
  /** Amount of time in seconds that the spawned entity will be alive for. A value of -1.0 means it will remain alive for as long as it can
   * @default -1 */
  entity_lifespan?: number;
  /** The entity type of the entities we will spawn in this step
   * @default "" */
  entity_type?: string;
  /** Number of entities that will be spawned in this step
   * @default 1 */
  num_entities_spawned?: number;
  /** The base shape of this step. Valid values are circle and line
   * @default "line" */
  shape?: "circle" | "line";
  /** The base size of the entity
   * @default 1 */
  size?: number;
  /** The sound event to play for this step
   * @default "undefined" */
  sound_event?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** Maximum number of summoned entities at any given time
   * @default 0 */
  summon_cap?: number;
  /** Summon Cap Radius
   * @default 0 */
  summon_cap_radius?: number;
  /** Event to invoke on each summoned entity on spawn
   * @default "" */
  summon_event?: string | EventRef;
  /** The target of the spell. This is where the spell will start (line will start here, circle will be centered here)
   * @default "self" */
  target?: "self" | "target";
};
export type EntityMinecraftBehaviorSwell = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** This mob starts swelling when a target is at least this many blocks away.
   * @default 10 */
  start_distance?: number;
  /** This mob stops swelling when a target has moved away at least this many blocks.
   * @default 2 */
  stop_distance?: number;
};
export type EntityMinecraftBehaviorTargetWhenPushed = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** List of entity types that can trigger this mob to begin targeting
  
  Sample values:
  • iron_golem: [{"filters":{"all_of":[{"subject":"other","test... */
  entity_types?: Array<Record<string, unknown>> | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** The probability that the mob will target another mob when pushed. A value of 100 is 100%
  
  Sample values:
  • iron_golem: 5
   * @default 0 */
  percent_chance?: number;
  /** 
  
  Sample values:
  • iron_golem: 1
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorTempt = {
  /** Range of random ticks to wait between tempt sounds. Can be a number, an array [min, max], or an object with range_min/range_max or min/max. */
  sound_interval?: number | (Array<{
      "0"?: number;
      "1"?: number;
    }>) | ({
      /** Minimum interval */
      range_min?: number;
      /** Maximum interval */
      range_max?: number;
      /** Minimum interval */
      min?: number;
      /** Maximum interval */
      max?: number;
    });
  /** If true, the mob can stop being tempted if the player moves too fast while close to this mob.
   * @default false */
  can_get_scared?: boolean;
  /** If true, vertical distance to the player will be considered when tempting.
  
  Sample values:
  • frog: true
   * @default false */
  can_tempt_vertically?: boolean;
  /** If true, the mob can be tempted even if it has a passenger (i.e. if being ridden).
   * @default false */
  can_tempt_while_ridden?: boolean;
  /** List of items that can tempt the mob.
  
  Sample values:
  • chicken: ["wheat_seeds","beetroot_seeds","melon_seeds","...
  • cow: ["wheat"]
  • frog: ["slime_ball"]
   * @default "[]" */
  items?: string[];
  /** Movement speed multiplier of the mob when using this AI Goal
  
  Sample values:
  • chicken: 1
  • cow: 1.25
  • goat: 0.75
   * @default 1 */
  speed_multiplier?: number;
  /** The distance at which the mob will stop following the player.
   * @default 1.5 */
  stop_distance?: number;
  /** Sound to play while the mob is being tempted. */
  tempt_sound?: string;
  /** Distance in blocks this mob can get tempted by a player holding an item they like.
   * @default 0 */
  within_radius?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorTradeInterest = {
  /** The max time in seconds that the trader will hold an item before attempting to switch for a different item that takes the same trade
   * @default 2 */
  carried_item_switch_time?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The time in seconds before the trader can use this goal again
   * @default 2 */
  cooldown?: number;
  /** The max time in seconds that the trader will be interested with showing its trade items
   * @default 45 */
  interest_time?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The max time in seconds that the trader will wait when you no longer have items to trade
   * @default 1 */
  remove_item_time?: number;
  /** Distance in blocks this mob can be interested by a player holding an item they like
   * @default 0 */
  within_radius?: number;
};
export type EntityMinecraftBehaviorVexCopyOwnerTarget = {
  /** List of entities this mob can copy the owner from */
  entity_types?: Array<{
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** If true, the mob has to be visible to be a valid choice
       * @default false */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the running speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    }>;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorVexRandomMove = {
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorWitherRandomAttackPosGoal = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • wither: 3
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorWitherTargetHighestDamage = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** List of entity types the wither takes into account to find who dealt the most damage to it */
  entity_types?: (Array<{
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** If true, the mob has to be visible to be a valid choice
       * @default false */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the running speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    }>) | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • wither: 1
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBlockClimber = Record<string, unknown>;
export type EntityMinecraftBlockSensor = {
  /** List of blocks to watch for being broken to fire off a specified event. If a block is in multiple lists, multiple events will fire. */
  on_break?: Array<{
      /** List of blocks that trigger the on_block_broken event. */
      block_list?: string[];
      /** Event to call when a block in block_list is broken. */
      on_block_broken?: string;
    }>;
  /** List of sources that break the block to listen for. If none are specified, all block breaks will be detected. */
  sources?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** The maximum radial distance in which a specified block can be detected. The biggest radius is 32.0.
   * @default 16 */
  sensor_radius?: number;
};
export type EntityMinecraftBodyRotationAlwaysFollowsHead = Record<string, unknown>;
export type EntityMinecraftBodyRotationBlocked = Record<string, unknown>;
export type EntityMinecraftBoostable = {
  /** List of items that can be used to boost while riding this entity.
  
  Sample values:
  • pig: [{"item":"carrotOnAStick","damage":2,"replace_i...
  • strider: [{"item":"warped_fungus_on_a_stick","damage":1,... */
  boost_items?: Array<{
      /** This is the damage that the item will take each time it is used. */
      damage?: number;
      /** Name of the item that can be used to boost. */
      item?: string;
      /** The item used to boost will become this item once it is used up. */
      replace_item?: string;
    }>;
  /** Time in seconds for the boost.
  
  Sample values:
  • pig: 3
  • strider: 16
   * @default 3 */
  duration?: number;
  /** Factor by which the entity's normal speed increases. E.g. 2.0 means go twice as fast.
  
  Sample values:
  • pig: 1.35
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBoss = {
  /** The max distance from the boss at which the boss's health bar is present on the players screen.
   * @default 55 */
  hud_range?: number;
  /** The name that will be displayed above the boss's health bar.
   * @default 55 */
  name?: string;
  /** Whether the sky should darken in the presence of the boss.
   * @default false */
  should_darken_sky?: boolean;
};
export type EntityMinecraftBreakBlocks = {
  /** A list of the blocks that can be broken as this entity moves around. */
  breakable_blocks?: string[];
};
export type EntityMinecraftBreathable = {
  /** Time in seconds the entity can hold its breath.
  
  Sample values:
  • bat: 15
   * @default 15 */
  total_supply?: number;
  /** Time in seconds between suffocation damage.
   * @default -20 */
  suffocate_time?: number;
  /** If set, this entity can breathe in air.
   * @default true */
  breathes_air?: boolean;
  /** If set, this entity can breathe in lava.
   * @default true */
  breathes_lava?: boolean;
  /** If set, this entity can breathe in solid blocks.
   * @default false */
  breathes_solids?: boolean;
  /** If set, this entity can breathe in water.
  
  Sample values:
  • bogged: true
   * @default false */
  breathes_water?: boolean;
  /** If set, this entity will have visible bubbles while in water.
   * @default true */
  generates_bubbles?: boolean;
  /** Time in seconds to recover breath to maximum.
   * @default 0 */
  inhale_time?: number;
  /** List of blocks this entity can breathe in, in addition to the selected items above. */
  breathe_blocks?: string[];
  /** List of blocks this entity cannot breathe in, in addition to the selected items above. */
  non_breathe_blocks?: string[];
  /** If true, entities that only breathe water (for example, fish) will take dehydration damage when out of water.
  
  *Introduced in version 1.21.130*
   * @default false */
  can_dehydrate?: boolean;
  /** SuffocateTime */
  suffocateTime?: number;
  /** 
  
  Sample values:
  • allay: 15 */
  totalSupply?: number;
};
export type EntityMinecraftBreedable = {
  /** If true, entities can breed while sitting
   * @default false */
  allow_sitting?: boolean;
  /** If true, the entities will blend their attributes in the offspring after they breed. For example, horses blend their health, movement, and jump_strength in their offspring.
   * @default true */
  blend_attributes?: boolean;
  /** Time in seconds before the Entity can breed again.
   * @default 60 */
  breed_cooldown?: number;
  /** The list of items that can be used to get the entity into the 'love' state. Can be a single item or an array.
  
  Sample values:
  • chicken: ["wheat_seeds","beetroot_seeds","melon_seeds","...
  • cow: ["wheat"]
  • frog: ["slime_ball"] */
  breed_items?: string[] | string;
  /** The entity definitions that this entity can breed with. Can be a single object or an array.
  
  Sample values:
  • chicken: {"minecraft:chicken":{}}
  • cow: {"minecraft:cow":{}}
  • frog: {"minecraft:frog":{"event":"become_pregnant","t... */
  breeds_with?: (Array<{
      /** The entity definition of this entity's babies. */
      baby_type?: string;
      /** Event to run when this entity breeds. Can be a simple event name string or a trigger object with event and optional filters. */
      breed_event?: string | EventRef | EventTrigger;
      /** The entity definition that this entity can mate with. */
      mate_type?: string;
    }>) | ({
      /** The entity definition of this entity's babies. */
      baby_type?: string;
      /** Event to run when this entity breeds. Can be a simple event name string or a trigger object with event and optional filters. */
      breed_event?: string | EventRef | EventTrigger;
      /** The entity definition that this entity can mate with. */
      mate_type?: string;
    });
  /** If true, the entity will become pregnant instead of spawning a baby.
  
  Sample values:
  • frog: true
   * @default false */
  causes_pregnancy?: boolean;
  /** If true and no color mutation occurs, the baby's `minecraft:color` is set to a blend of the parents' colors (following DyeItem combination rules). If the parents' colors aren't compatible, the baby inherits one parent's color at random.
  
  *Introduced in version 1.21.60*
   * @default false */
  combine_parent_colors?: boolean;
  /** Determines how likely the baby of parents with the same variant will deny that variant and take a random variant within the given range instead. */
  deny_parents_variant?: {
      /** The percentage chance of denying the parents' variant. */
      chance?: number;
      /** The inclusive maximum of the variant range. */
      max_variant?: string;
      /** The inclusive minimum of the variant range. */
      min_variant?: string;
    };
  /** The list of nearby block requirements to get the entity into the 'love' state. */
  environment_requirements?: Array<{
      /** The block types required nearby for the entity to breed. */
      block_types?: string[];
      /** The number of the required block types nearby for the entity to breed. */
      count?: number;
      /** How many blocks radius from the mob's center to search in for the required blocks. Bounded between 0 and 16. */
      radius?: number;
    }>;
  /** Chance that up to 16 babies will spawn.
   * @default 0 */
  extra_baby_chance?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** If true, the babies will be automatically tamed if its parents are. */
  inherit_tamed?: boolean;
  /** The filters to run when attempting to fall in love. */
  love_filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** Determines how likely the babies are to NOT inherit one of their parent's variances. */
  mutation_factor?: {
      /** The percentage chance of denying the parents' variant. */
      color?: number | [number, number] | ({
          /** Minimum value of the range */
          min?: number;
          /** Maximum value of the range */
          max?: number;
        });
      /** The percentage chance of a mutation on the entity's variant type. */
      variant?: number | [number, number] | ({
          /** Minimum value of the range */
          min?: number;
          /** Maximum value of the range */
          max?: number;
        });
      /** The percentage chance of a mutation on the entity's extra variant type. */
      extra_variant?: number | [number, number] | ({
          /** Minimum value of the range */
          min?: number;
          /** Maximum value of the range */
          max?: number;
        });
    };
  /** If true, the entity needs to be at full health before it can breed.
   * @default false */
  require_full_health?: boolean;
  /** If true, the entities need to be tamed first before they can breed.
  
  Sample values:
  • llama: true
   * @default true */
  require_tame?: boolean;
};
export type EntityMinecraftBribeable = {
  /** The list of items that can be used to bribe the entity. Can be an array or a single item string.
  
  Sample values:
  • dolphin: ["fish","salmon"] */
  bribe_items?: string[] | string;
  /** Time in seconds before the Entity can be bribed again.
   * @default 2 */
  bribe_cooldown?: number;
};
export type EntityMinecraftBuoyant = {
  /** Type of vertical movement applied to the entity. `waves` simulates wave movement based on the entity's speed (default). `bobbing` moves the entity up and down at a constant pace. `none` disables wave movement. Replaces the previous `simulate_waves` boolean.
  
  *Introduced in version 1.26.10*
   * @default "waves" */
  movement_type?: string;
  /** Whether the entity can step out of a liquid block onto a neighboring solid block when pushed against it.
  
  *Introduced in version 1.26.10*
   * @default false */
  can_auto_step_from_liquid?: boolean;
  /** Applies gravity each tick. Causes "movement_type" to be more impactful, but also gravity to be applied more intensely outside liquids.
   * @default true */
  apply_gravity?: boolean;
  /** Base buoyancy used to calculate how much will a entity float.
   * @default 1 */
  base_buoyancy?: number;
  /** Probability for a big wave hitting the entity. Only used if "movement_type" is "waves".
   * @default 0.03 */
  big_wave_probability?: number;
  /** Multiplier for the speed to make a big wave. Triggered depending on "big_wave_probability".
   * @default 10 */
  big_wave_speed?: number;
  /** How much an entity will be dragged down when the component is removed.
   * @default 0 */
  drag_down_on_buoyancy_removed?: number;
  /** List of blocks this entity can float on. Must be a liquid block.
  
  Sample values:
  • xp_orb: ["minecraft:flowing_water","minecraft:water"] */
  liquid_blocks?: string[];
};
export type EntityMinecraftBurnsInDaylight = {
  /** The equipment slot that provides protection from burning in sunlight. If armor is equipped in this slot, the entity will not burn. Commonly set to 'slot.armor.head' for helmets or 'slot.armor.body' for horse armor.
  
  *Introduced in version 1.21.130*
   * @default "slot.armor.head" */
  protection_slot?: "slot.armor.body" | "slot.armor.chest" | "slot.armor.feet" | "slot.armor.head" | "slot.armor.legs" | "slot.weapon.mainhand" | "slot.weapon.offhand";
};
export type EntityMinecraftCanClimb = Record<string, unknown>;
export type EntityMinecraftCanFly = Record<string, unknown>;
export type EntityMinecraftCanJoinRaid = Record<string, unknown>;
export type EntityMinecraftCanPowerJump = Record<string, unknown>;
export type EntityMinecraftCannotBeAttacked = Record<string, unknown>;
export type EntityMinecraftCelebrateHunt = {
  /** If true, celebration will be broadcasted to other entities in the radius.
   * @default true */
  broadcast?: boolean;
  /** The list of conditions that target of hunt must satisfy to initiate celebration. */
  celeberation_targets?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** The sound event to play when the mob is celebrating */
  celebrate_sound?: string;
  /** Duration, in seconds, of celebration
   * @default 4 */
  duration?: number;
  /** If broadcast is enabled, specifies the radius in which it will notify other entities for celebration.
   * @default 16 */
  radius?: number;
  /** The range of time in seconds to randomly wait before playing the sound again
   * @default 0 */
  sound_interval?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
};
export type EntityMinecraftCollisionBox = {
  /** Height of the collision box in blocks. A negative value will be assumed to be 0.
  
  Sample values:
  • allay: 0.6
  • armor_stand: 1.975
  • arrow: 0.25
   * @default 1.7999999523162842 */
  height?: number;
  /** Width and Depth of the collision box in blocks. A negative value will be assumed to be 0.
  
  Sample values:
  • allay: 0.35
  • armor_stand: 0.5
  • arrow: 0.25
   * @default 0.6000000238418579 */
  width?: number;
};
export type EntityMinecraftColor = {
  /** The Palette Color value of the entity.
   * @default 0 */
  value?: number;
};
export type EntityMinecraftColor2 = {
  /** The second Palette Color value of the entity.
   * @default 0 */
  value?: number;
};
export type EntityMinecraftCombatRegeneration = {
  /** Determines if the mob will grant mobs of the same type combat buffs if they kill the target.
   * @default false */
  apply_to_family?: boolean;
  /** Determines if the mob will grant itself the combat buffs if it kills the target.
   * @default false */
  apply_to_self?: boolean;
  /** The duration in seconds of Regeneration I added to the mob. Can also be set to "infinite"
   * @default 5 */
  regeneration_duration?: number;
};
export type EntityMinecraftConditionalBandwidthOptimization = {
  /** The object containing the default bandwidth optimization values.
  
  Sample values:
  • arrow: {"max_dropped_ticks":7,"max_optimized_distance"... */
  default_values?: {
      /** The maximum distance considered during bandwidth optimizations.
       * @default 80 */
      max_optimized_distance?: number;
      /** Determines the maximum ticks spatial update packets can be not sent.
       * @default 10 */
      max_dropped_ticks?: number;
      /** When true, smaller motion packets will be sent during drop packet intervals.
       * @default false */
      use_motion_prediction_hints?: boolean;
    };
  /** The object containing the conditional bandwidth optimization values. */
  conditional_values?: Array<{
      /** Conditions that must be met for these optimization values to be used. */
      conditional_values?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** In relation to the optimization value, determines the maximum ticks spatial update packets can be not sent.
       * @default 10 */
      max_dropped_ticks?: number;
      /** The maximum distance considered during bandwidth optimizations. Any value below the max is interpolated to find optimization, and any value greater than or equal to this max results in max optimization.
       * @default 80 */
      max_optimized_distance?: number;
      /** When set to true, smaller motion packets will be sent during drop packet intervals, resulting in the same amount of packets being sent as without optimizations but with much less data being sent. This should be used when actors are travelling very quickly or teleporting to prevent visual oddities.
       * @default false */
      use_motion_prediction_hints?: boolean;
    }>;
};
export type EntityMinecraftCustomHitTest = {
  /** List of hitboxes for melee and ranged hits against the entity. */
  hitboxes?: Array<{
      /** Width of the hitbox. */
      width?: number;
      /** Height of the hitbox. */
      height?: number;
      /** Pivot point of the hitbox. */
      pivot?: [number, number, number];
    }>;
};
export type EntityMinecraftDamageOverTime = {
  /** Amount of damage caused each hurt.
  
  Sample values:
  • dolphin: 1
   * @default 1 */
  damage_per_hurt?: number;
  /** Time in seconds between damage.
  
  Sample values:
  • vex: 1
   * @default 0 */
  time_between_hurt?: number;
};
export type EntityMinecraftDamageSensor = {
  /** Defines how received damage affects the entity.
  
  Values:
  • yes: Received damage is applied to the entity.
  • no: Received damage is not applied to the entity.
  • no_but_side_effects_apply: Received damage is not applied to the entity, but the side effects of the attack are. This means that the attacker's weapon loses durability, enchantment side effects are applied, and so on.
  • no_but_entity_effects_apply: Damage is not applied to the entity, but knockback and enchantments are still applied and the attacker's weapon is used as normal. The entity does not flash red. */
  deals_damage?: boolean | "yes" | "no" | "no_but_side_effects_apply" | "no_but_entity_effects_apply";
  /** List of triggers with the events to call when taking specific kinds of damage.
  
  Sample values:
  • allay: [{"deals_damage":"no","on_damage":{"filters":{"...
  • bat: {"cause":"fall","deals_damage":"no"}
  • breeze: [{"cause":"fall","deals_damage":"no"},{"cause":... */
  triggers?: (Array<string | ({
      /** Type of damage that triggers the events.
       * @default "none" */
      cause?: string;
      /** A modifier that adds/removes to the base damage received from the specified damage cause.
       * @default 0 */
      damage_modifier?: number;
      /** A multiplier that modifies the base damage received from the specified damage cause.
       * @default 1 */
      damage_multiplier?: number;
      /** Defines how received damage affects the entity. */
      deals_damage?: boolean | string;
      /** Defines which entities the trigger applies to, and which event to emit when damaged. */
      on_damage?: string | ({
          event?: string | EventRef;
          target?: string;
        });
      /** Defines what sound to play when the on_damage filters are met. */
      on_damage_sound_event?: string;
      /** Filter conditions for when this trigger applies. */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** Event to emit when the trigger conditions are met. */
      event?: string | EventRef;
    })>) | Record<string, unknown>;
};
export type EntityMinecraftDash = {
  /** The dash cooldown in seconds. Default value is 1.000000.
  
  Sample values:
  • camel: 2.75
   * @default 1 */
  cooldown_time?: number;
  /** Horizontal momentum of the dash.
  
  Sample values:
  • camel: 20
   * @default 1 */
  horizontal_momentum?: number;
  /** Vertical momentum of the dash.
  
  Sample values:
  • camel: 0.6
   * @default 1 */
  vertical_momentum?: number;
};
export type EntityMinecraftDefaultLookAngle = {
  /** Angle in degrees.
   * @default 0 */
  value?: number;
};
export type EntityMinecraftDespawn = {
  /** Specifies if the 'min_distance' and 'max_distance' are used in the standard despawn rules.
  
  Sample values:
  • bat: {} */
  despawn_from_distance?: {
      /** Maximum distance for standard despawn rules to instantly despawn the mob.
       * @default 128 */
      max_distance?: number;
      /** Minimum distance for standard despawn rules to try to despawn the mob.
       * @default 32 */
      min_distance?: number;
    };
  /** Determines if "min_range_random_chance" is used in the standard despawn rules
   * @default true */
  despawn_from_chance?: boolean;
  /** Determines if the "min_range_inactivity_timer" is used in the standard despawn rules.
   * @default true */
  despawn_from_inactivity?: boolean;
  /** Determines if the mob is instantly despawned at the edge of simulation distance in the standard despawn rules.
   * @default true */
  despawn_from_simulation_edge?: boolean;
  /** The list of conditions that must be satisfied before the Actor is despawned. If a filter is defined then standard despawn rules are ignored. */
  filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** The amount of time in seconds that the mob must be inactive.
   * @default 30 */
  min_range_inactivity_timer?: number;
  /** A random chance between 1 and the given value.
   * @default 800 */
  min_range_random_chance?: number;
  /** If true, all entities linked to this entity in a child relationship (eg. leashed) will also be despawned.
   * @default false */
  remove_child_entities?: boolean;
};
export type EntityMinecraftDimensionBound = Record<string, unknown>;
export type EntityMinecraftDryingOutTimer = {
  /** Event to fire when the drying out time runs out. Can be an object with event and target properties, or a simple event string.
  
  Sample values:
  • dolphin: {"event":"dried_out"} */
  dried_out_event?: EventTrigger | string | EventRef;
  /** Event to fire when entity was already dried out but received increase in water supply. Can be an object with event and target properties, or a simple event string.
  
  Sample values:
  • dolphin: {"event":"recover_after_dried_out"} */
  recover_after_dried_out_event?: EventTrigger | string | EventRef;
  /** Event to fire when entity stopped drying out. Can be an object with event and target properties, or a simple event string.
  
  Sample values:
  • dolphin: {"event":"stop_dryingout"} */
  stopped_drying_out_event?: EventTrigger | string | EventRef;
  /** Amount of time in seconds to dry out fully.
  
  Sample values:
  • dolphin: 120
   * @default 0 */
  total_time?: number;
  /** Optional amount of additional time in seconds given by using splash water bottle on entity.
   * @default 0 */
  water_bottle_refill_time?: number;
};
export type EntityMinecraftDweller = {
  /** The type of dwelling the entity wishes to join. Current Types: village.
  
  Sample values:
  • iron_golem: village */
  dwelling_type?: string;
  /** The role of which the entity plays in the dwelling. Current Roles: inhabitant, defender, hostile, passive. */
  dwelling_role?: string;
  /** How often the entity checks on their dwelling status in ticks. Positive values only.
  
  Sample values:
  • iron_golem: 60 */
  update_interval_base?: number;
  /** The variant value in ticks that will be added to the update_interval_base.
  
  Sample values:
  • iron_golem: 40 */
  update_interval_variant?: number;
  /** Whether or not the entity can find and add POIs to the dwelling. */
  can_find_poi?: boolean;
  /** Determines how much reputation players are rewarded on first founding. */
  first_founding_reward?: number;
  /** Determines whether the entity can migrate between dwellings, or only have its initial dwelling.
  
  Sample values:
  • iron_golem: true */
  can_migrate?: boolean;
  /** A padding distance for checking if the entity is within the dwelling. */
  dwelling_bounds_tolerance?: number;
  /** Allows the user to define a starting profession for this particular Dweller, instead of letting them choose organically. (They still need to gain experience from trading before this takes effect.) */
  preferred_profession?: string;
  /** 
  
  Sample values:
  • iron_golem: defender */
  dweller_role?: string;
};
export type EntityMinecraftEconomyTradeTable = {
  /** Determines when the mob transforms, if the trades should be converted when the new mob has a economy_trade_table. When the trades are converted, the mob will generate a new trade list with their new trade table, but then it will try to convert any of the same trades over to have the same enchantments and user data. For example, if the original has a Emerald to Enchanted Iron Sword (Sharpness 1), and the new trade also has an Emerald for Enchanted Iron Sword, then the enchantment will be Sharpness 1.
   * @default false */
  convert_trades_economy?: boolean;
  /** How much should the discount be modified by when the player has cured the Zombie Villager. Can be specified as a pair of numbers (When use_legacy_price_formula is true this is the low-tier trade discount and high-tier trade discount, otherwise it is the minor positive gossip and major positive gossip.) */
  cured_discount?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** Name to be displayed while trading with this entity */
  display_name?: string;
  /** Used in legacy prices to determine how much should Demand be modified by when the player has the Hero of the Village mob effect
   * @default -4 */
  hero_demand_discount?: number;
  /** The max the discount can be modified by when the player has cured the Zombie Villager. Can be specified as a pair of numbers (When use_legacy_price_formula is true this is the low-tier trade discount and high-tier trade discount, otherwise it is the minor positive gossip and major positive gossip.) */
  max_cured_discount?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** The max the discount can be modified by when the player has cured a nearby Zombie Villager. Only used when use_legacy_price_formula is true, otherwise max_cured_discount (low) is used.
   * @default -200 */
  max_nearby_cured_discount?: number;
  /** How much should the discount be modified by when the player has cured a nearby Zombie Villager
   * @default -20 */
  nearby_cured_discount?: number;
  /** Used to determine if trading with entity opens the new trade screen
   * @default false */
  new_screen?: boolean;
  /** Determines if the trades should persist when the mob transforms. This makes it so that the next time the mob is transformed to something with a trade_table or economy_trade_table, then it keeps their trades.
   * @default false */
  persist_trades?: boolean;
  /** Show an in game trade screen when interacting with the mob.
   * @default true */
  show_trade_screen?: boolean;
  /** File path relative to the resource pack root for this entity's trades */
  table?: string;
  /** Determines whether the legacy formula is used to determines the trade prices.
   * @default false */
  use_legacy_price_formula?: boolean;
};
export type EntityMinecraftEntityArmorEquipmentSlotMapping = {
  /** The armor slot an item equipped to 'minecraft:equippable''s second slot should be equipped to. It defaults to 'slot.armor.torso' for entities with a format version prior to 1.21.10, and to 'slot.armor.body' otherwise. */
  armor_slot?: string;
};
export type EntityMinecraftEntitySensor = {
  /** Limits the search to Players only for all subsensors.
   * @default false */
  find_players_only?: boolean;
  /** If true the subsensors' range is additive on top of the entity's size.
   * @default true */
  relative_range?: boolean;
  /** The list of subsensors which sense for entities and emit events when all their conditions are met.
  
  Sample values:
  • parrot: [{"event":"minecraft:on_riding_player","event_f...
  • parrot: [{"event":"minecraft:on_not_riding_player","eve... */
  subsensors?: Array<{
      /** How many seconds should elapse before the subsensor can once again sense for entities. The cooldown is applied on top of the base 1 tick (0.05 seconds) delay. Negative values will result in no cooldown being used.
       * @default -1 */
      cooldown?: number;
      /** Event to fire when the conditions are met. */
      event?: string | EventRef | ({
          event?: string | EventRef;
          target?: string;
        });
      /** The set of conditions that must be satisfied to fire the event. */
      event_filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** The maximum number of entities that must pass the filter conditions for the event to send.
       * @default -1 */
      maximum_count?: number;
      /** The minimum number of entities that must pass the filter conditions for the event to send.
       * @default 1 */
      minimum_count?: number;
      /** The maximum horizontal and vertical distance another entity can be from this and have the filters checked against it.
       * @default "[10, 10]" */
      range?: [number, number];
      /** If true requires all nearby entities to pass the filter conditions for the events to send.
       * @default false */
      require_all?: boolean;
      /** Vertical offset applied to the entity's position when computing the distance from other entities.
       * @default 0 */
      y_offset?: number;
    }>;
};
export type EntityMinecraftEnvironmentSensor = {
  /** The list of triggers that fire when the environment conditions match the given filter criteria. Can be an array of trigger objects or a single trigger object.
  
  Sample values:
  • breeze: [{"event":"minecraft:stop_playing_idle_ground_s...
  • cave_spider: {"event":"minecraft:become_neutral","filters":{...
  • cave_spider: {"event":"minecraft:become_hostile","filters":{... */
  triggers?: Array<Record<string, unknown>> | Record<string, unknown>;
};
export type EntityMinecraftEquipItem = {
  /** List of items that the entity should not equip.
  
  Sample values:
  • bogged: [{"item":"minecraft:banner:15"}] */
  excluded_items?: Array<{
      item?: string;
    }>;
  /** If true, the entity can pick up and wear armor items from the ground.
   * @default false */
  can_wear_armor?: boolean;
};
export type EntityMinecraftEquipment = {
  /** A list of slots with the chance to drop an equipped item from that slot. Can be an array of slot name strings or an array of objects with slot and drop_chance properties. */
  slot_drop_chance?: string[] | (Array<{
      /** The equipment slot name. */
      slot?: string;
      /** The chance to drop the equipped item (0.0 to 1.0). */
      drop_chance?: number;
    }>);
  /** The file path to the equipment table, relative to the behavior pack's root. */
  table?: string;
};
export type EntityMinecraftEquippable = {
  /** List of slots and the item that can be equipped.
  
  Sample values:
  • llama: [{"slot":1,"item":"carpet","accepted_items":["c... */
  slots?: Array<{
      /** The list of items that can go in this slot. */
      accepted_items?: string[];
      /** Text to be displayed when the entity can be equipped with this item when playing with Touch-screen controls. */
      interact_text?: string;
      /** Identifier of the item that can be equipped for this slot. */
      item?: string;
      /** Event to trigger when this entity is equipped with this item. */
      on_equip?: string | ({
          event?: string | EventRef;
          target?: string;
        });
      /** Event to trigger when this item is removed from this entity. */
      on_unequip?: string | ({
          event?: string | EventRef;
          target?: string;
        });
      /** The slot number of this slot.
       * @default 0 */
      slot?: number;
    }>;
};
export type EntityMinecraftExhaustionValues = {
  /** Amount of exhaustion applied when triggering the Lunge enchantment, multiplied by the enchantment level.
  
  *Introduced in version 1.21.130*
  
  Sample values:
  • player: 4
   * @default 4 */
  lunge?: number;
  /** Amount of exhaustion applied when attacking.
  
  Sample values:
  • player: 0.1
   * @default 0.10000000149011612 */
  attack?: number;
  /** Amount of exhaustion applied when taking damage.
  
  Sample values:
  • player: 0.1
   * @default 0.10000000149011612 */
  damage?: number;
  /** Amount of exhaustion applied when healed through food regeneration.
  
  Sample values:
  • player: 6
   * @default 6 */
  heal?: number;
  /** Amount of exhaustion applied when jumping.
  
  Sample values:
  • player: 0.05
   * @default 0.05000000074505806 */
  jump?: number;
  /** Amount of exhaustion applied when mining.
  
  Sample values:
  • player: 0.005
   * @default 0.004999999888241291 */
  mine?: number;
  /** Amount of exhaustion applied when sprinting.
  
  Sample values:
  • player: 0.1
   * @default 0.009999999776482582 */
  sprint?: number;
  /** Amount of exhaustion applied when sprint jumping.
  
  Sample values:
  • player: 0.2
   * @default 0.20000000298023224 */
  sprint_jump?: number;
  /** Amount of exhaustion applied when swimming.
  
  Sample values:
  • player: 0.01
   * @default 0.009999999776482582 */
  swim?: number;
  /** Amount of exhaustion applied when walking.
   * @default 0 */
  walk?: number;
};
export type EntityMinecraftExperienceReward = {
  /** A Molang expression defining the amount of experience rewarded when this entity is successfully bred.
  
  Sample values:
  • breeze: Math.Random(1,7) */
  on_bred?: string | number | ({
      [key: string]: unknown;
    });
  /** A Molang expression defining the amount of experience rewarded when this entity dies.
  
  Sample values:
  • blaze: query.last_hit_by_player ? 10 : 0
  • bogged: query.last_hit_by_player ? 5 + (query.equipment_count * Math.Random(1,3)) : 0
  • cave_spider: query.last_hit_by_player ? 5 : 0 */
  on_death?: string | number | ({
      [key: string]: unknown;
    });
};
export type EntityMinecraftExplode = {
  /** A scale factor applied to the explosion's damage to entities. A value of 0 prevents the explosion from dealing any damage. Negative values cause the explosion to heal entities instead.
  
  *Introduced in version 1.21.40*
   * @default 1 */
  damage_scaling?: number;
  /** If true, the explosion will toggle blocks in the explosion radius.
  
  *Introduced in version 1.21.40*
  
  Sample values:
  • breeze_wind_charge_projectile: true
   * @default false */
  toggles_blocks?: boolean;
  /** A scale factor applied to the knockback force caused by the explosion.
  
  *Introduced in version 1.21.40*
  
  Sample values:
  • breeze_wind_charge_projectile: 0.6
  • wind_charge_projectile: 1.22
   * @default 1 */
  knockback_scaling?: number;
  /** The name of the particle effect to use. The accepted strings are 'explosion', 'wind_burst', or 'breeze_wind_burst'.
  
  *Introduced in version 1.21.40*
  
  Sample values:
  • breeze_wind_charge_projectile: breeze_wind_burst
  • wind_charge_projectile: wind_burst
   * @default "explosion" */
  particle_effect?: string;
  /** The name of the sound effect played when the explosion triggers.
  
  *Introduced in version 1.21.40*
  
  Sample values:
  • breeze_wind_charge_projectile: breeze_wind_charge.burst
  • wind_charge_projectile: wind_charge.burst
   * @default "explode" */
  sound_effect?: string;
  /** Defines whether the explosion should apply fall damage negation to Players above the point of collision.
  
  *Introduced in version 1.21.40*
  
  Sample values:
  • wind_charge_projectile: true
   * @default false */
  negates_fall_damage?: boolean;
  /** If true, the explosion will affect blocks and entities under water.
  
  *Introduced in version 1.21.40*
  
  Sample values:
  • breeze_wind_charge_projectile: true
   * @default false */
  allow_underwater?: boolean;
  /** If true, the explosion will destroy blocks in the explosion radius.
   * @default true */
  breaks_blocks?: boolean;
  /** If true, blocks in the explosion radius will be set on fire.
  
  Sample values:
  • fireball: true
   * @default false */
  causes_fire?: boolean;
  /** If true, whether the explosion breaks blocks is affected by the mob griefing game rule.
  
  Sample values:
  • ender_crystal: true
   * @default false */
  destroy_affected_by_griefing?: boolean;
  /** If true, whether the explosion causes fire is affected by the mob griefing game rule.
  
  Sample values:
  • fireball: true
   * @default false */
  fire_affected_by_griefing?: boolean;
  /** The range for the random amount of time the fuse will be lit before exploding, a negative value means the explosion will be immediate.
  
  Sample values:
  • tnt_minecart: 4 */
  fuse_length?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** If true, the fuse is already lit when this component is added to the entity.
  
  Sample values:
  • ender_crystal: true
   * @default false */
  fuse_lit?: boolean;
  /** A blocks explosion resistance will be capped at this value when an explosion occurs.
   * @default 3.40282e+38 */
  max_resistance?: number;
  /** The radius of the explosion in blocks and the amount of damage the explosion deals.
  
  Sample values:
  • breeze_wind_charge_projectile: 3
  • ender_crystal: 6
  • fireball: 1
   * @default 3 */
  power?: number;
  /** 
  
  Properties:
  • component_groups (string)
  
  Sample values:
  • fireball: {"component_groups":["minecraft:exploding"]} */
  add?: {
      /** 
      
      Sample values:
      • fireball: ["minecraft:exploding"] */
      component_groups?: string;
    };
};
export type EntityMinecraftFireImmune = Record<string, unknown>;
export type EntityMinecraftFloatsInLiquid = Record<string, unknown>;
export type EntityMinecraftFlocking = {
  /** The amount of blocks away the entity will look at to push away from.
  
  Sample values:
  • dolphin: 1
   * @default 0 */
  block_distance?: number;
  /** The weight of the push back away from blocks.
   * @default 0 */
  block_weight?: number;
  /** The amount of push back given to a flocker that breaches out of the water.
   * @default 0 */
  breach_influence?: number;
  /** The threshold in which to start applying cohesion.
  
  Sample values:
  • dolphin: 6.5
   * @default 1 */
  cohesion_threshold?: number;
  /** The weight applied for the cohesion steering of the flock.
  
  Sample values:
  • dolphin: 1.85
   * @default 1 */
  cohesion_weight?: number;
  /** The weight on which to apply on the goal output.
  
  Sample values:
  • dolphin: 2
   * @default 0 */
  goal_weight?: number;
  /** Determines the high bound amount of entities that can be allowed in the flock.
  
  Sample values:
  • dolphin: 8
   * @default 0 */
  high_flock_limit?: number;
  /** Tells the Flocking Component if the entity exists in water.
   * @default false */
  in_water?: boolean;
  /** The area around the entity that allows others to be added to the flock.
  
  Sample values:
  • dolphin: 6
   * @default 0 */
  influence_radius?: number;
  /** The distance in which the flocker will stop applying cohesion.
  
  Sample values:
  • dolphin: 3.5
   * @default 0 */
  innner_cohesion_threshold?: number;
  /** The percentage chance between 0-1 that a fish will spawn and not want to join flocks. Invalid values will be capped at the end points.
  
  Sample values:
  • dolphin: 0.1
   * @default 0 */
  loner_chance?: number;
  /** Determines the low bound amount of entities that can be allowed in the flock.
  
  Sample values:
  • dolphin: 4
   * @default 0 */
  low_flock_limit?: number;
  /** Tells the flockers that they can only match similar entities that also match the variant, mark variants, and color data of the other potential flockers.
   * @default false */
  match_variants?: boolean;
  /** The max height allowable in the air or water.
  
  Sample values:
  • dolphin: 4
   * @default 0 */
  max_height?: number;
  /** The min height allowable in the air or water.
  
  Sample values:
  • dolphin: 4
   * @default 0 */
  min_height?: number;
  /** The distance that is determined to be to close to another flocking and to start applying separation.
  
  Sample values:
  • dolphin: 3
   * @default 2 */
  separation_threshold?: number;
  /** The weight applied to the separation of the flock.
  
  Sample values:
  • dolphin: 1.75
   * @default 1 */
  separation_weight?: number;
  /** Tells the flockers that they will follow flocks based on the center of mass.
   * @default false */
  use_center_of_mass?: boolean;
};
export type EntityMinecraftFlyingSpeed = {
  /** Flying speed in blocks per tick.
  
  Sample values:
  • allay: 0.1
  • ender_dragon: 0.6
   * @default 0.02 */
  value?: number;
};
export type EntityMinecraftFollowRange = {
  /** The default follow range in blocks. Entities will attempt to stay within this radius of their target.
  
  Sample values:
  • allay: 1024
  • blaze: 48
  • breeze: 32 */
  value?: number;
  /** Maximum follow distance in blocks. The entity will not pursue targets beyond this range.
  
  Sample values:
  • blaze: 48
  • elder_guardian: 16 */
  max?: number;
};
export type EntityMinecraftFrictionModifier = {
  /** The higher the number, the more friction affects this entity. A value of 1.0 means regular friction, while 2.0 means twice as much.
   * @default 1 */
  value?: number;
};
export type EntityMinecraftGameEventMovementTracking = {
  /** If true, the `flap` game event will be emitted when the entity moves through air.
  
  Sample values:
  • allay: true
   * @default false */
  emit_flap?: boolean;
  /** If true, the `entityMove` game event will be emitted when the entity moves on ground or through a solid.
   * @default true */
  emit_move?: boolean;
  /** If true, the `swim` game event will be emitted when the entity moves through a liquid.
   * @default true */
  emit_swim?: boolean;
};
export type EntityMinecraftGenetics = {
  /** The list of genes that this entity has and will cross with a partner during breeding.
  
  Sample values:
  • goat: [{"name":"goat_variant","use_simplified_breedin... */
  genes?: Array<{
      /** The range of positive integer allele values for this gene. Spawned mobs will have a random number in this range assigned to them. Can be a single integer or an object with range_min and range_max properties. */
      allele_range?: number | ({
          /** Minimum allele value */
          range_min?: number;
          /** Maximum allele value */
          range_max?: number;
        });
      /** The list of genetic variants for this gene. These check for particular allele combinations and fire events when all of them are satisfied. */
      genetic_variants?: Array<{
          /** Event to run when this mob is created and matches the allele conditions. */
          birth_event?: string | EventRef | ({
              event?: string | EventRef;
              target?: string;
            });
          /** If this value is non-negative, compare both the mob's main and hidden alleles with this value for a match with both. Can also be a range of integers. */
          both_allele?: number | ({
              /** Minimum allele value */
              range_min?: number;
              /** Maximum allele value */
              range_max?: number;
            });
          /** If this value is non-negative, compare both the mob's main and hidden alleles with this value for a match with either. Can also be a range of integers. */
          either_allele?: number | ({
              /** Minimum allele value */
              range_min?: number;
              /** Maximum allele value */
              range_max?: number;
            });
          /** If this value is non-negative, compare the mob's hidden allele with this value for a match. Can also be a range of integers. */
          hidden_allele?: number | ({
              /** Minimum allele value */
              range_min?: number;
              /** Maximum allele value */
              range_max?: number;
            });
          /** If this value is non-negative, compare the mob's main allele with this value for a match. Can also be a range of integers. */
          main_allele?: number | ({
              /** Minimum allele value */
              range_min?: number;
              /** Maximum allele value */
              range_max?: number;
            });
        }>;
      /** If this value is non-negative, overrides the chance for this gene that an allele will be replaced with a random one instead of the parent's allele during birth. Non-negative values greater than `1` will be the same as the value `1`.
       * @default -1 */
      mutation_rate?: number;
      /** The name of the gene. */
      name?: string;
      /** If true, mobs spawned from breeding will always inherit main alleles from parents' main alleles and hidden alleles from the hidden ones. */
      use_simplified_breeding?: boolean;
    }>;
  /** Chance that an allele will be replaced with a random one instead of the parent's allele during birth.
  
  Sample values:
  • goat: 0.02
   * @default 0.03125 */
  mutation_rate?: number;
};
export type EntityMinecraftGiveable = {
  /** The list of items that can be given to the entity to place in their inventory. Can be an array or a single item string. */
  items?: string[] | string;
  /** Event to fire when the correct item is given. Can be an object with event and target properties, or a simple event string. */
  on_give?: Record<string, unknown> | string;
  /** An optional cool down in seconds to prevent spamming interactions.
   * @default 0 */
  cooldown?: number;
};
export type EntityMinecraftGroundOffset = {
  /** The value of the entity's offset from the terrain, in blocks.
   * @default 0 */
  value?: number;
};
export type EntityMinecraftGroupSize = {
  /** The list of conditions that must be satisfied for other entities to be counted towards group size. */
  filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** Radius from center of entity.
   * @default 16 */
  radius?: number;
};
export type EntityMinecraftGrowsCrop = {
  /** Value between 0-1. Chance of success per tick
   * @default 0 */
  chance?: number;
  /** Number of charges
   * @default 10 */
  charges?: number;
};
export type EntityMinecraftHealable = {
  /** Determines if item can be used regardless of entity being at full health.
  
  Sample values:
  • parrot: true
   * @default false */
  force_use?: boolean;
  /** The filter group that defines the conditions for using this item to heal the entity.
  
  Sample values:
  • parrot: {"operator":"!=","test":"is_riding","value":true} */
  filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** The array of items that can be used to heal this entity.
  
  Sample values:
  • llama: [{"item":"wheat","heal_amount":2},{"item":"hay_...
  • parrot: [{"effects":[{"amplifier":0,"chance":1,"duratio... */
  items?: Array<{
      /** The amount of health this entity gains when fed this item.
       * @default 1 */
      heal_amount?: number;
      /** Item identifier that can be used to heal this entity. */
      item?: string;
      /** 
      
      Properties:
      • amplifier (number)
      • chance (number)
      • duration (number)
      • name (string) */
      effects?: Array<{
          /** 
          
          Sample values:
          • parrot: 0 */
          amplifier?: number;
          /** 
          
          Sample values:
          • parrot: 1 */
          chance?: number;
          /** 
          
          Sample values:
          • parrot: 1000 */
          duration?: number;
          /** 
          
          Sample values:
          • parrot: fatal_poison */
          name?: string;
        }>;
    }>;
};
export type EntityMinecraftHealth = {
  /** Starting health for this entity in health points (1 point = half a heart). */
  value?: number | ({
      range_min?: number;
      range_max?: number;
    });
  /** Maximum health this entity can have. Can be higher than the starting value to allow healing beyond initial health.
   * @default 20 */
  max?: number;
};
export type EntityMinecraftHeartbeat = {
  /** A Molang expression defining the inter-beat interval in seconds. A value of zero or less means no heartbeat.
  
  Sample values:
  • warden: 2.0 - math.clamp(query.anger_level / 80 * 1.5, 0, 1.5)
   * @default "1.00" */
  interval?: string;
  /** Level sound event to be played as the heartbeat sound.
   * @default "heartbeat" */
  sound_event?: string | ({
      event?: string | EventRef;
      target?: string;
    });
};
export type EntityMinecraftHide = Record<string, unknown>;
export type EntityMinecraftHome = {
  /** Defines how the entity will be restricted to its home position. Valid values are: 'none' (no restriction), 'random_movement' (restricts random wandering to be near home), and 'all_movement' (restricts all movement to be near home, though entities can always move closer to home if they are too far away).
  
  *Introduced in version 1.21.40*
   * @default "none" */
  restriction_type?: "all_movement" | "none" | "random_movement";
  /** Optional list of blocks that can be considered a valid home. If no such block longer exists at that position, the home restriction is removed. Example syntax: minecraft:sand. Not supported: minecraft:sand:1. */
  home_block_list?: string[];
  /** Optional radius that the entity will be restricted to in relation to its home.
   * @default 0 */
  restriction_radius?: number;
};
export type EntityMinecraftHorseJumpStrength = {
  /** Value of jump strength the entity has when spawned. */
  value?: ({
      /** Defines the minimum strength level. */
      range_min?: number;
      /** Defines the maximum strength level. */
      range_max?: number;
    }) | number;
};
export type EntityMinecraftHurtOnCondition = {
  /** List of damage conditions that when met can cause damage to the entity.
  
  Sample values:
  • allay: [{"cause":"lava","damage_per_tick":4,"filters":... */
  damage_conditions?: Array<{
      /** The kind of damage that is caused to the entity. Various armors and spells use this to determine if the entity is immune. */
      cause?: string;
      /** The amount of damage done each tick that the conditions are met.
       * @default 1 */
      damage_per_tick?: number;
      /** The set of conditions that must be satisfied before the entity takes the defined damage. */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
    }>;
};
export type EntityMinecraftIgnoreCannotBeAttacked = {
  /** Defines which entities are exceptions and are allowed to be attacked by the owner entity, potentially attacked entity is subject "other". If this is not specified then all attacks by the owner are allowed. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
};
export type EntityMinecraftInputAirControlled = {
  /** Modifies speed going backwards.
  
  Sample values:
  • happy_ghast: 0.5
   * @default 0.5 */
  backwards_movement_modifier?: number;
  /** Modifies the strafe speed.
  
  Sample values:
  • happy_ghast: 1
   * @default 0.4 */
  strafe_speed_modifier?: number;
};
export type EntityMinecraftInputGroundControlled = Record<string, unknown>;
export type EntityMinecraftInsideBlockNotifier = {
  /** List of blocks, with certain block states, that we are monitoring to see if the entity is inside.
  
  Sample values:
  • boat: [{"block":{"name":"minecraft:bubble_column","st... */
  block_list?: Array<{
      /** The block to monitor, including name and optional states. */
      block?: {
          /** The block identifier. */
          name?: string;
          /** Block states to match. */
          states?: {
              [key: string]: boolean;
            };
        };
      /** Event to fire when the entity enters the block. */
      entered_block_event?: string | EventRef | ({
          event?: string | EventRef;
          target?: string;
        });
      /** Event to fire when the entity exits the block. */
      exited_block_event?: string | EventRef | ({
          event?: string | EventRef;
          target?: string;
        });
    }>;
};
export type EntityMinecraftInsomnia = {
  /** Number of days the mob has to stay up until the insomnia effect begins.
  
  Sample values:
  • player: 3
   * @default 3 */
  days_until_insomnia?: number;
};
export type EntityMinecraftInstantDespawn = {
  /** If true, all entities linked to this entity in a child relationship (eg. leashed) will also be despawned.
   * @default false */
  remove_child_entities?: boolean;
};
export type EntityMinecraftInteract = {
  /** The list of interactions for this entity. */
  interactions?: EntityInteractiondata[] | Record<string, unknown>;
  /** Time in seconds before this entity can be interacted with again.
   * @default 0 */
  cooldown?: number;
  /** Time in seconds before this entity can be interacted with after being attacked.
   * @default 0 */
  cooldown_after_being_attacked?: number;
  /** The entity's slot to remove and drop the item from, if any, upon successful interaction. Inventory slots are denoted by positive numbers. Equipment slots are denoted by 'slot.weapon.mainhand', 'slot.weapon.offhand', 'slot.armor.head', 'slot.armor.chest', 'slot.armor.legs', 'slot.armor.feet' and 'slot.armor.body'. */
  drop_item_slot?: string;
  /** Will offset the item drop position this amount in the y direction. Requires "drop_item_slot" to be specified.
   * @default 0 */
  drop_item_y_offset?: number;
  /** The entity's slot to equip the item to, if any, upon successful interaction. Inventory slots are denoted by positive numbers. Equipment slots are denoted by 'slot.weapon.mainhand', 'slot.weapon.offhand', 'slot.armor.head', 'slot.armor.chest', 'slot.armor.legs', 'slot.armor.feet' and 'slot.armor.body'. */
  equip_item_slot?: string;
  /** The amount of health this entity will recover or lose when interacting with this item. Negative values will harm the entity.
   * @default 0 */
  health_amount?: number;
  /** The amount of damage the item will take when used to interact with this entity. A value of 0 means the item won't lose durability.
   * @default 0 */
  hurt_item?: number;
  /** Text to show when the player is able to interact in this way with this entity when playing with touch-screen controls. */
  interact_text?: string;
};
export type EntityInteractiondata = {
  /** Loot table with items to add to the player's inventory upon successful interaction. */
  add_items?: EntityAdditemsdata;
  /** If true, the mob that's interacted with will try to do an admire action after interaction. For this to be successful the mob has to have an Admire component and an Admire goal in place.
   * @default false */
  admire?: boolean;
  /** If true, the mob that's interacted with will try to do a barter action after interaction. For this to be successful the mob has to have a Barter component and a Barter goal in place.
   * @default false */
  barter?: boolean;
  /** Time in seconds before this entity can be interacted with again.
   * @default 0 */
  cooldown?: number;
  /** Time in seconds before this entity can be interacted with after being attacked.
   * @default 0 */
  cooldown_after_being_attacked?: number;
  /** The entity's slot to remove and drop the item from, if any, upon successful interaction. Inventory slots are denoted by positive numbers. Equipment slots are denoted by 'slot.weapon.mainhand', 'slot.weapon.offhand', 'slot.armor.head', 'slot.armor.chest', 'slot.armor.legs', 'slot.armor.feet' and 'slot.armor.body'. */
  drop_item_slot?: string;
  /** Will offset the item drop position this amount in the y direction. Requires "drop_item_slot" to be specified.
   * @default 0 */
  drop_item_y_offset?: number;
  /** The entity's slot to equip the item to, if any, upon successful interaction. Inventory slots are denoted by positive numbers. Equipment slots are denoted by 'slot.weapon.mainhand', 'slot.weapon.offhand', 'slot.armor.head', 'slot.armor.chest', 'slot.armor.legs', 'slot.armor.feet' and 'slot.armor.body'. */
  equip_item_slot?: string;
  /** If true, the mob that's interacted with will try to replace its current main-hand item with the interactable item after interaction.
   * @default false */
  give_item?: boolean;
  /** The amount of health this entity will recover or lose when interacting with this item. Negative values will harm the entity.
   * @default 0 */
  health_amount?: number;
  /** The amount of damage the item will take when used to interact with this entity. A value of 0 means the item won't lose durability.
   * @default 0 */
  hurt_item?: number;
  /** Text to show when the player is able to interact in this way with this entity when playing with touch-screen controls.
   * @default "" */
  interact_text?: string;
  /** Event to fire when the interaction occurs. */
  on_interact?: EntityActordefinitiontrigger;
  /** Particle effect that will be triggered at the start of the interaction. */
  particle_on_start?: EntityInteractparticledata;
  /** List of sounds to play when the interaction occurs. */
  play_sounds?: string[];
  /** Allows to repair one of the entity's items. */
  repair_entity_item?: EntityRepairentityitemdata;
  /** List of entities to spawn when the interaction occurs. */
  spawn_entities?: string[];
  /** Loot table with items to drop on the ground upon successful interaction. */
  spawn_items?: EntitySpawnitemsdata;
  /** If true, the player will do the 'swing' animation when interacting with this entity.
   * @default true */
  swing?: boolean;
  /** If true, the mob that's interacted with will try to replace its current main-hand item with an empty item, and its current main-hand item will occupy the empty selected slot of the player.
   * @default false */
  take_item?: boolean;
  /** The item used will transform to this item upon successful interaction. Format: itemName:auxValue
   * @default "" */
  transform_to_item?: string;
  /** If true, the interaction will use an item.
   * @default false */
  use_item?: boolean;
  /** Vibration to emit when the interaction occurs.
   * @default "entity_interact" */
  vibration?: "entity_act" | "entity_die" | "entity_interact" | "none" | "shear";
};
export type EntityAdditemsdata = {
  /** File path, relative to the Behavior Pack's path, to the loot table file. */
  table: string;
};
export type EntityInteractparticledata = {
  /** Copper Event
   * @default "none" */
  copper_event?: "none" | "scrape" | "wax_off" | "wax_on";
  /** Whether or not the particle will appear closer to who performed the interaction.
   * @default false */
  particle_offset_towards_interactor?: boolean;
  /** The type of particle that will be spawned.
   * @default "none" */
  particle_type?: "balloongas" | "bleach" | "blockforcefield" | "blueflame" | "breezewindexplosion" | "bubble" | "bubblecolumndown" | "bubblecolumnup" | "bubblemanual" | "campfiresmoke" | "campfiresmoketall" | "candleflame" | "carrotboost" | "coloredflame" | "conduit" | "creakingcrumble" | "crit" | "dragonbreath" | "dragonbreathfire" | "dragonbreathtrail" | "dragondestroyblock" | "driphoney" | "driplava" | "dripwater" | "dustplume" | "electricspark" | "enchantingtable" | "endrod" | "evaporation" | "explode" | "eyeblossomclose" | "eyeblossomopen" | "fallingborderdust" | "fallingdust" | "fireworks" | "fireworksoverlay" | "fireworksstarter" | "flame" | "food" | "greenflame" | "heart" | "hugeexplosion" | "iconcrack" | "ink" | "largeexplode" | "largesmoke" | "lava" | "mobappearance" | "mobflame" | "mobspell" | "mobspellambient" | "mobspellinstantaneous" | "myceliumdust" | "none" | "note" | "obsidiantear" | "orangepoplarleaves" | "paleoakleaves" | "pausemobgrowth" | "portal" | "portalreverse" | "rainsplash" | "reddust" | "redpoplarleaves" | "resetmobgrowth" | "risingborderdust" | "sculksoul" | "shriek" | "shulkerbullet" | "slime" | "smoke" | "sneeze" | "snowballpoof" | "snowflake" | "sonicexplosion" | "soul" | "sparkler" | "spit" | "stalactitedriplava" | "stalactitedripwater" | "sulfurcube" | "terrain" | "totem" | "townaura" | "trackingemitter" | "vaultconnection" | "villagerangry" | "villagerhappy" | "watersplash" | "watersplashmanual" | "waterwake" | "wax" | "whitesmoke" | "windexplosion" | "witchspell" | "wolfarmorcrack" | "yellowpoplarleaves";
  /** Will offset the particle this amount in the y direction.
   * @default 0 */
  particle_y_offset?: number;
};
export type EntityRepairentityitemdata = {
  /** How much of the item durability should be restored upon interaction.
   * @default 1 */
  amount?: number;
  /** The entity's slot containing the item to be repaired. Inventory slots are denoted by positive numbers. Equipment slots are denoted by 'slot.weapon.mainhand', 'slot.weapon.offhand', 'slot.armor.head', 'slot.armor.chest', 'slot.armor.legs', 'slot.armor.feet' and 'slot.armor.body'. */
  slot?: string;
};
export type EntitySpawnitemsdata = {
  /** File path, relative to the Behavior Pack's path, to the loot table file.
   * @default "" */
  table?: string;
  /** Will offset the items spawn position this amount in the y direction.
   * @default 1 */
  y_offset?: number;
};
export type EntityMinecraftInventory = {
  /** Number of slots that this entity can gain per extra strength
   * @default 0 */
  additional_slots_per_strength?: number;
  /** If true, the contents of this inventory can be removed by a hopper
   * @default false */
  can_be_siphoned_from?: boolean;
  /** Type of container this entity has. Can be horse, minecart_chest, chest_boat, minecart_hopper, inventory, container or hopper
   * @default "none" */
  container_type?: string;
  /** Number of slots the container has
   * @default 5 */
  inventory_size?: number;
  /** If true, the entity will not drop its inventory on death
   * @default false */
  private?: boolean;
  /** If true, the entity's inventory can only be accessed by its owner or itself
   * @default false */
  restrict_to_owner?: boolean;
};
export type EntityMinecraftIsBaby = Record<string, unknown>;
export type EntityMinecraftIsCharged = Record<string, unknown>;
export type EntityMinecraftIsChested = Record<string, unknown>;
export type EntityMinecraftIsCollidable = Record<string, unknown>;
export type EntityMinecraftIsDyeable = {
  /** The text that will display when interacting with this entity with a dye when playing with Touch-screen controls.
  
  Sample values:
  • sheep: action.interact.dye */
  interact_text?: string;
};
export type EntityMinecraftIsHiddenWhenInvisible = Record<string, unknown>;
export type EntityMinecraftIsIgnited = Record<string, unknown>;
export type EntityMinecraftIsIllagerCaptain = Record<string, unknown>;
export type EntityMinecraftIsPregnant = Record<string, unknown>;
export type EntityMinecraftIsSaddled = Record<string, unknown>;
export type EntityMinecraftIsShaking = Record<string, unknown>;
export type EntityMinecraftIsSheared = Record<string, unknown>;
export type EntityMinecraftIsStackable = {
  /** Whether this entity is stackable.
   * @default true */
  value?: boolean;
};
export type EntityMinecraftIsStunned = Record<string, unknown>;
export type EntityMinecraftIsTamed = Record<string, unknown>;
export type EntityMinecraftItemControllable = {
  /** List of items that can be used to control this entity while ridden. Can be a single string or an array of strings.
  
  Sample values:
  • pig: carrotOnAStick
  • strider: warped_fungus_on_a_stick */
  control_items?: string[] | string;
};
export type EntityMinecraftItemHopper = Record<string, unknown>;
export type EntityMinecraftJumpDynamic = {
  /** Jump data used during normal skip movement. Object with optional `distance_scale` (horizontal velocity multiplier), `height` (vertical force), `jump_delay` (ticks between jumps), and `animation_duration` (jump animation length).
  
  *Introduced in version 1.26.0*
  
  Values:
  • Animation Duration: Duration of the jump animation.
  • Distance Scale: The multiplier applied to horizontal velocity when jumping.
  • Height: The force applied vertically when jumping.
  • Jump Delay: Amount of ticks between sequential jumps. */
  regular_skip_data?: EntityJumpdatadefinition;
  /** Jump data used while traveling quickly with skip movement. Object with the same shape as `regular_skip_data`.
  
  *Introduced in version 1.26.0*
  
  Values:
  • Animation Duration: Duration of the jump animation.
  • Distance Scale: The multiplier applied to horizontal velocity when jumping.
  • Height: The force applied vertically when jumping.
  • Jump Delay: Amount of ticks between sequential jumps. */
  fast_skip_data?: EntityJumpdatadefinition;
};
export type EntityJumpdatadefinition = {
  /** Duration of the jump animation.
   * @default 1 */
  animation_duration?: number;
  /** The multiplier applied to horizontal velocity when jumping.
   * @default 1 */
  distance_scale?: number;
  /** The force applied vertically when jumping.
   * @default 0.10000000149011612 */
  height?: number;
  /** Amount of ticks between sequential jumps.
   * @default 30 */
  jump_delay?: number;
};
export type EntityMinecraftJumpStatic = {
  /** The initial vertical velocity for the jump.
   * @default 0.41999998688697815 */
  jump_power?: number;
};
export type EntityMinecraftKnockbackResistance = {
  /** The amount of knockback resistance, from 0.0 (none) to 1.0 (full immunity).
  
  Sample values:
  • armor_stand: 1
  • ender_dragon: 100 */
  value?: number;
  /** Maximum potential knockback resistance for this entity.
  
  Sample values:
  • ender_dragon: 100 */
  max?: number;
};
export type EntityMinecraftLavaMovement = {
  /** The speed the mob moves over a lava block.
  
  Sample values:
  • strider: 0.32 */
  value?: number;
};
export type EntityMinecraftLeashable = {
  /** If true, players can cut both incoming and outgoing leashes by using shears on the entity.
  
  *Introduced in version 1.21.90*
   * @default true */
  can_be_cut?: boolean;
  /** If true, players can leash this entity even if it is already leashed to another entity.
   * @default false */
  can_be_stolen?: boolean;
  /** Distance in blocks at which the leash stiffens, restricting movement.
   * @default 6 */
  hard_distance?: number;
  /** Distance in blocks at which the 'spring' effect starts acting to keep this entity close to the entity that leashed it.
   * @default 4 */
  soft_distance?: number;
  /** Distance in blocks it which the leash breaks.
   * @default 0 */
  max_distance?: number;
  /** Event to call when this entity is leashed. Can be an object with event and target properties, or a simple event string. */
  on_leash?: Record<string, unknown> | string;
  /** Event to call when this entity is unleashed. Can be an object with event and target properties, or a simple event string. */
  on_unleash?: Record<string, unknown> | string;
  /** If true, the entity is unleashed when this component is removed. Defaults to true.
  
  *Introduced in version 1.26.30*
   * @default true */
  unleash_on_removal?: boolean;
  /** When set to true, "on_unleash" does not trigger when the entity gets unleashed for reasons other than the player directly interacting with it.
   * @default false */
  on_unleash_interact_only?: boolean;
  /** Defines how this entity behaves when leashed to another entity. The first preset which "filter" conditions are met will be applied; if none match, a default configuration is used instead.
  
  Sample values:
  • boat: [{"filter":{"subject":"other","test":"is_family... */
  presets?: Array<{
      /** Conditions that must be met for this preset to be applied. */
      filter?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** Distance (in blocks) over which the entity starts being pulled towards the leash holder with a spring-like force. Entities can enter and stay in vehicles if the leash is stretched under this distance, but will dismount once it exceeds it.
       * @default 7 */
      hard_distance?: number;
      /** Distance in blocks at which the leash breaks.
       * @default 12 */
      max_distance?: number;
      /** Adjusts the rotation at which the entity reaches equilibrium, when "spring_type" is set to "dampened" or "quad_dampened".
       * @default 0 */
      rotation_adjustment?: number;
      /** Distance (in blocks) over which the entity starts pathfinding toward the leash holder, if able.
       * @default 4 */
      soft_distance?: number;
      /** Defines the type of spring-like force that pulls the entity towards its leash holder:
      - "bouncy": Simulates a highly elastic spring that never reaches an equilibrium if the leashed entity is suspended mid-air.
      - "dampened": Simulates a dampened spring attached to the front of the leashed entity's collision. It reaches an equilibrium if the entity is suspended mid-air and aligns with the movement direction.
      - "quad_dampened": Simulates four dampened springs connected to the center of each side of the entities' collisions. It reaches an equilibrium if the entity is suspended mid-air and gradually aligns with the leash holder over time.
       * @default "dampened" */
      spring_type?: string;
    }>;
};
export type EntityMinecraftLeashableTo = {
  /** If true, all entities leashed to this entity are automatically unleashed when this component is removed. Defaults to true.
  
  *Introduced in version 1.26.30*
   * @default true */
  unleash_on_removal?: boolean;
  /** Allows players to retrieve entities that are leashed to this entity.
   * @default false */
  can_retrieve_from?: boolean;
};
export type EntityMinecraftLookedAt = {
  /** Defines if and how the owner entity will set entities that are looking at it as its combat targets. Valid values: 'never', 'once_and_stop_scanning', 'once_and_keep_scanning'. */
  set_target?: "never" | "once_and_stop_scanning" | "once_and_keep_scanning" | number;
  /** Defines, in degrees, the width of the field of view for entities looking at the owner entity. If "scale_fov_by_distance" is set to true, this value corresponds to the field of view at a distance of one block between the entities.
   * @default 26 */
  field_of_view?: number;
  /** Defines which entities are considered when searching for entities looking at the owner entity. */
  filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** Limits the search to only the nearest Player that meets the specified "filters" rather than all nearby entities.
   * @default false */
  find_players_only?: boolean;
  /** Defines the type of block shape used to check for line of sight obstructions. Valid values: "outline", "collision", "collision_for_camera".
   * @default "collision" */
  line_of_sight_obstruction_type?: string;
  /** A list of locations on the owner entity towards which line of sight checks are performed. At least one location must be unobstructed for the entity to be considered as looked at. */
  look_at_locations?: string[];
  /** Specifies the range for the random number of seconds that must pass before the owner entity can check again for entities looking at it, after detecting an entity looking at it. */
  looked_at_cooldown?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** Defines the event to trigger when an entity is detected looking at the owner entity. */
  looked_at_event?: string | EventRef | ({
      event?: string | EventRef;
      target?: string;
    });
  /** Defines the minimum, continuous time the owner entity has to be looked at before being considered as such. Defaults to 0 if not explicitly specified.
   * @default 0 */
  min_looked_at_duration?: number;
  /** Defines the event to trigger when no entity is found looking at the owner entity. */
  not_looked_at_event?: string | EventRef | ({
      event?: string | EventRef;
      target?: string;
    });
  /** When true, the field of view narrows as the distance between the owner entity and the entity looking at it increases. This ensures that the width of the view cone remains somewhat constant towards the owner entity position, regardless of distance.
   * @default true */
  scale_fov_by_distance?: boolean;
  /** Maximum distance the owner entity will search for entities looking at it.
   * @default 10 */
  search_radius?: number;
};
export type EntityMinecraftLoot = {
  /** Path to the loot table JSON file, relative to the behavior pack's root (e.g., 'loot_tables/entities/zombie.json'). */
  table?: string;
};
export type EntityMinecraftManagedWanderingTrader = Record<string, unknown>;
export type EntityMinecraftMarkVariant = {
  /** The Id of the mark_variant. By convention, 0 is the Id of the base entity.
   * @default 0 */
  value?: number;
};
export type EntityMinecraftMobEffect = {
  /** If true, the effect renders with the ambient effect background (like Beacons or Conduits) and does not pulse as it nears expiration.
  
  *Introduced in version 1.21.130*
   * @default false */
  ambient?: boolean;
  /** Time in seconds to wait between each application of the effect.
   * @default 0 */
  cooldown_time?: number;
  /** How close a hostile entity must be to have the mob effect applied.
   * @default 0.2 */
  effect_range?: number;
  /** How long the applied mob effect lasts in seconds. Can also be set to "infinite"
   * @default 10 */
  effect_time?: number;
  /** The set of entities that are valid to apply the mob effect to. */
  entity_filter?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** The mob effect that is applied to entities that enter this entities effect range. */
  mob_effect?: string;
};
export type EntityMinecraftMobEffectImmunity = {
  /** List of names of effects the entity is immune to.
  
  Sample values:
  • parched: ["weakness"]
  • silverfish: ["infested"]
  • slime: ["oozing"] */
  mob_effects?: string[];
};
export type EntityMinecraftMovement = {
  /** The base movement speed value. Higher values result in faster movement. Can be a single number or a range object with range_min and range_max properties. */
  value?: number | ({
      /** Minimum movement speed */
      range_min?: number;
      /** Maximum movement speed */
      range_max?: number;
    });
  /** Maximum movement speed this entity can have. */
  max?: number;
};
export type EntityMinecraftMovementAmphibious = {
  /** The maximum number in degrees the mob can turn per tick.
   * @default 30 */
  max_turn?: number;
};
export type EntityMinecraftMovementBasic = {
  /** The maximum number in degrees the mob can turn per tick.
   * @default 30 */
  max_turn?: number;
};
export type EntityMinecraftMovementDolphin = Record<string, unknown>;
export type EntityMinecraftMovementFly = {
  /** The maximum number in degrees the mob can turn per tick.
   * @default 30 */
  max_turn?: number;
  /** Initial speed of the mob when it starts gliding.
   * @default 0.1 */
  start_speed?: number;
  /** Speed that the mob adjusts to when it has to turn quickly.
   * @default 0.2 */
  speed_when_turning?: number;
};
export type EntityMinecraftMovementGeneric = {
  /** The maximum number in degrees the mob can turn per tick.
   * @default 30 */
  max_turn?: number;
};
export type EntityMinecraftMovementGlide = {
  /** The maximum number in degrees the mob can turn per tick.
   * @default 30 */
  max_turn?: number;
  /** Speed that the mob adjusts to when it has to turn quickly.
   * @default 0.2 */
  speed_when_turning?: number;
};
export type EntityMinecraftMovementHover = {
  /** The maximum number in degrees the mob can turn per tick.
   * @default 30 */
  max_turn?: number;
};
export type EntityMinecraftMovementJump = {
  /** Delay in seconds after landing when using the slime move control. Can be a single number, an array [min, max], or an object with range_min and range_max. */
  jump_delay?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** The maximum number in degrees the mob can turn per tick.
   * @default 30 */
  max_turn?: number;
};
export type EntityMinecraftMovementSkip = {
  /** The maximum number in degrees the mob can turn per tick.
   * @default 30 */
  max_turn?: number;
};
export type EntityMinecraftMovementSway = {
  /** The maximum number in degrees the mob can turn per tick.
   * @default 30 */
  max_turn?: number;
  /** Strength of the sway movement.
   * @default 0.05 */
  sway_amplitude?: number;
  /** Multiplier for the frequency of the sway movement.
   * @default 0.5 */
  sway_frequency?: number;
};
export type EntityMinecraftMovementSoundDistanceOffset = {
  /** The higher the number, the less often the movement sound will be played.
   * @default 1 */
  value?: number;
};
export type EntityMinecraftNameable = {
  /** If true, this entity can be renamed with name tags
   * @default true */
  allow_name_tag_renaming?: boolean;
  /** If true, the name will always be shown
   * @default false */
  always_show?: boolean;
  /** Trigger to run when the entity gets named */
  default_trigger?: string;
  /** Describes the special names for this entity and the events to call when the entity acquires those names */
  name_actions?: Array<{
      /** List of special names that will cause the events defined in 'on_named' to fire */
      name_filter?: string;
      /** Event to be called when this entity acquires the name specified in 'name_filter' */
      on_named?: string | ({
          event?: string | EventRef;
          target?: string;
        });
    }>;
};
export type EntityMinecraftNavigationClimb = {
  /** Tells the pathfinder to avoid blocks that cause damage when finding a path
   * @default false */
  avoid_damage_blocks?: boolean;
  /** Tells the pathfinder to avoid portals (like nether portals) when finding a path
   * @default false */
  avoid_portals?: boolean;
  /** Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths
   * @default false */
  avoid_sun?: boolean;
  /** Tells the pathfinder to avoid water when creating a path
   * @default false */
  avoid_water?: boolean;
  /** Tells the pathfinder which blocks to avoid when creating a path */
  blocks_to_avoid?: string[];
  /** Tells the pathfinder whether or not it can jump out of water (like a dolphin)
   * @default false */
  can_breach?: boolean;
  /** Tells the pathfinder that it can path through a closed door and break it
   * @default false */
  can_break_doors?: boolean;
  /** Tells the pathfinder whether or not it can jump up blocks
   * @default true */
  can_jump?: boolean;
  /** Tells the pathfinder that it can path through a closed door assuming the AI will open the door
   * @default false */
  can_open_doors?: boolean;
  /** Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door
   * @default false */
  can_open_iron_doors?: boolean;
  /** Whether a path can be created through a door
   * @default true */
  can_pass_doors?: boolean;
  /** Tells the pathfinder that it can start pathing when in the air
   * @default false */
  can_path_from_air?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the lava
   * @default false */
  can_path_over_lava?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the water
  
  Sample values:
  • cave_spider: true
   * @default false */
  can_path_over_water?: boolean;
  /** Tells the pathfinder whether or not it will be pulled down by gravity while in water
   * @default true */
  can_sink?: boolean;
  /** Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path
   * @default false */
  can_swim?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground outside water
   * @default true */
  can_walk?: boolean;
  /** Tells the pathfinder whether or not it can travel in lava like walking on ground
   * @default false */
  can_walk_in_lava?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground underwater
   * @default false */
  is_amphibious?: boolean;
};
export type EntityMinecraftNavigationFloat = {
  /** Tells the pathfinder to avoid blocks that cause damage when finding a path
   * @default false */
  avoid_damage_blocks?: boolean;
  /** Tells the pathfinder to avoid portals (like nether portals) when finding a path
   * @default false */
  avoid_portals?: boolean;
  /** Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths
   * @default false */
  avoid_sun?: boolean;
  /** Tells the pathfinder to avoid water when creating a path
   * @default false */
  avoid_water?: boolean;
  /** Tells the pathfinder which blocks to avoid when creating a path */
  blocks_to_avoid?: string[];
  /** Tells the pathfinder whether or not it can jump out of water (like a dolphin)
   * @default false */
  can_breach?: boolean;
  /** Tells the pathfinder that it can path through a closed door and break it
   * @default false */
  can_break_doors?: boolean;
  /** Tells the pathfinder whether or not it can jump up blocks
   * @default true */
  can_jump?: boolean;
  /** Tells the pathfinder that it can path through a closed door assuming the AI will open the door
   * @default false */
  can_open_doors?: boolean;
  /** Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door
   * @default false */
  can_open_iron_doors?: boolean;
  /** Whether a path can be created through a door
   * @default true */
  can_pass_doors?: boolean;
  /** Tells the pathfinder that it can start pathing when in the air
   * @default false */
  can_path_from_air?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the lava
   * @default false */
  can_path_over_lava?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the water
  
  Sample values:
  • bat: true
   * @default false */
  can_path_over_water?: boolean;
  /** Tells the pathfinder whether or not it will be pulled down by gravity while in water
   * @default true */
  can_sink?: boolean;
  /** Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path
   * @default false */
  can_swim?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground outside water
   * @default true */
  can_walk?: boolean;
  /** Tells the pathfinder whether or not it can travel in lava like walking on ground
   * @default false */
  can_walk_in_lava?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground underwater
   * @default false */
  is_amphibious?: boolean;
  /** 
  
  Sample values:
  • bat: true */
  using_door_annotation?: string;
};
export type EntityMinecraftNavigationFly = {
  /** Tells the pathfinder to avoid blocks that cause damage when finding a path
   * @default false */
  avoid_damage_blocks?: boolean;
  /** Tells the pathfinder to avoid portals (like nether portals) when finding a path
   * @default false */
  avoid_portals?: boolean;
  /** Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths
   * @default false */
  avoid_sun?: boolean;
  /** Tells the pathfinder to avoid water when creating a path
   * @default false */
  avoid_water?: boolean;
  /** Tells the pathfinder which blocks to avoid when creating a path */
  blocks_to_avoid?: string[];
  /** Tells the pathfinder whether or not it can jump out of water (like a dolphin)
   * @default false */
  can_breach?: boolean;
  /** Tells the pathfinder that it can path through a closed door and break it
   * @default false */
  can_break_doors?: boolean;
  /** Tells the pathfinder whether or not it can jump up blocks
   * @default true */
  can_jump?: boolean;
  /** Tells the pathfinder that it can path through a closed door assuming the AI will open the door
   * @default false */
  can_open_doors?: boolean;
  /** Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door
   * @default false */
  can_open_iron_doors?: boolean;
  /** Whether a path can be created through a door
   * @default true */
  can_pass_doors?: boolean;
  /** Tells the pathfinder that it can start pathing when in the air
  
  Sample values:
  • parrot: true
   * @default false */
  can_path_from_air?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the lava
   * @default false */
  can_path_over_lava?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the water
  
  Sample values:
  • parrot: true
   * @default false */
  can_path_over_water?: boolean;
  /** Tells the pathfinder whether or not it will be pulled down by gravity while in water
   * @default true */
  can_sink?: boolean;
  /** Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path
   * @default false */
  can_swim?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground outside water
   * @default true */
  can_walk?: boolean;
  /** Tells the pathfinder whether or not it can travel in lava like walking on ground
   * @default false */
  can_walk_in_lava?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground underwater
   * @default false */
  is_amphibious?: boolean;
};
export type EntityMinecraftNavigationGeneric = {
  /** Tells the pathfinder to avoid blocks that cause damage when finding a path
  
  Sample values:
  • frog: true
   * @default false */
  avoid_damage_blocks?: boolean;
  /** Tells the pathfinder to avoid portals (like nether portals) when finding a path
   * @default false */
  avoid_portals?: boolean;
  /** Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths
   * @default false */
  avoid_sun?: boolean;
  /** Tells the pathfinder to avoid water when creating a path
   * @default false */
  avoid_water?: boolean;
  /** Tells the pathfinder which blocks to avoid when creating a path */
  blocks_to_avoid?: string[];
  /** Tells the pathfinder whether or not it can jump out of water (like a dolphin)
  
  Sample values:
  • elder_guardian: true
   * @default false */
  can_breach?: boolean;
  /** Tells the pathfinder that it can path through a closed door and break it
   * @default false */
  can_break_doors?: boolean;
  /** Tells the pathfinder whether or not it can jump up blocks
   * @default true */
  can_jump?: boolean;
  /** Tells the pathfinder that it can path through a closed door assuming the AI will open the door
   * @default false */
  can_open_doors?: boolean;
  /** Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door
   * @default false */
  can_open_iron_doors?: boolean;
  /** Whether a path can be created through a door
   * @default true */
  can_pass_doors?: boolean;
  /** Tells the pathfinder that it can start pathing when in the air
   * @default false */
  can_path_from_air?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the lava
   * @default false */
  can_path_over_lava?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the water
  
  Sample values:
  • frog: true
   * @default false */
  can_path_over_water?: boolean;
  /** Tells the pathfinder whether or not it will be pulled down by gravity while in water
   * @default true */
  can_sink?: boolean;
  /** Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path
  
  Sample values:
  • elder_guardian: true
   * @default false */
  can_swim?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground outside water
  
  Sample values:
  • frog: true
   * @default true */
  can_walk?: boolean;
  /** Tells the pathfinder whether or not it can travel in lava like walking on ground
   * @default false */
  can_walk_in_lava?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground underwater
  
  Sample values:
  • elder_guardian: true
   * @default false */
  is_amphibious?: boolean;
  /** 
  
  Sample values:
  • elder_guardian: true */
  using_door_annotation?: string;
};
export type EntityMinecraftNavigationHover = {
  /** Tells the pathfinder to avoid blocks that cause damage when finding a path
  
  Sample values:
  • allay: true
   * @default false */
  avoid_damage_blocks?: boolean;
  /** Tells the pathfinder to avoid portals (like nether portals) when finding a path
   * @default false */
  avoid_portals?: boolean;
  /** Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths
   * @default false */
  avoid_sun?: boolean;
  /** Tells the pathfinder to avoid water when creating a path
  
  Sample values:
  • allay: true
   * @default false */
  avoid_water?: boolean;
  /** Tells the pathfinder which blocks to avoid when creating a path */
  blocks_to_avoid?: string[];
  /** Tells the pathfinder whether or not it can jump out of water (like a dolphin)
   * @default false */
  can_breach?: boolean;
  /** Tells the pathfinder that it can path through a closed door and break it
   * @default false */
  can_break_doors?: boolean;
  /** Tells the pathfinder whether or not it can jump up blocks
   * @default true */
  can_jump?: boolean;
  /** Tells the pathfinder that it can path through a closed door assuming the AI will open the door
   * @default false */
  can_open_doors?: boolean;
  /** Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door
   * @default false */
  can_open_iron_doors?: boolean;
  /** Whether a path can be created through a door
   * @default true */
  can_pass_doors?: boolean;
  /** Tells the pathfinder that it can start pathing when in the air
  
  Sample values:
  • allay: true
   * @default false */
  can_path_from_air?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the lava
   * @default false */
  can_path_over_lava?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the water
  
  Sample values:
  • allay: true
   * @default false */
  can_path_over_water?: boolean;
  /** Tells the pathfinder whether or not it will be pulled down by gravity while in water
   * @default true */
  can_sink?: boolean;
  /** Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path
   * @default false */
  can_swim?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground outside water
   * @default true */
  can_walk?: boolean;
  /** Tells the pathfinder whether or not it can travel in lava like walking on ground
   * @default false */
  can_walk_in_lava?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground underwater
   * @default false */
  is_amphibious?: boolean;
};
export type EntityMinecraftNavigationSwim = {
  /** Tells the pathfinder to avoid blocks that cause damage when finding a path
   * @default false */
  avoid_damage_blocks?: boolean;
  /** Tells the pathfinder to avoid portals (like nether portals) when finding a path
   * @default false */
  avoid_portals?: boolean;
  /** Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths
   * @default false */
  avoid_sun?: boolean;
  /** Tells the pathfinder to avoid water when creating a path
   * @default false */
  avoid_water?: boolean;
  /** Tells the pathfinder which blocks to avoid when creating a path */
  blocks_to_avoid?: string[];
  /** Tells the pathfinder whether or not it can jump out of water (like a dolphin)
   * @default false */
  can_breach?: boolean;
  /** Tells the pathfinder that it can path through a closed door and break it
   * @default false */
  can_break_doors?: boolean;
  /** Tells the pathfinder whether or not it can jump up blocks
   * @default true */
  can_jump?: boolean;
  /** Tells the pathfinder that it can path through a closed door assuming the AI will open the door
   * @default false */
  can_open_doors?: boolean;
  /** Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door
   * @default false */
  can_open_iron_doors?: boolean;
  /** Whether a path can be created through a door
   * @default true */
  can_pass_doors?: boolean;
  /** Tells the pathfinder that it can start pathing when in the air
   * @default false */
  can_path_from_air?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the lava
   * @default false */
  can_path_over_lava?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the water
   * @default false */
  can_path_over_water?: boolean;
  /** Tells the pathfinder whether or not it will be pulled down by gravity while in water
   * @default true */
  can_sink?: boolean;
  /** Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path
   * @default false */
  can_swim?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground outside water
   * @default true */
  can_walk?: boolean;
  /** Tells the pathfinder whether or not it can travel in lava like walking on ground
   * @default false */
  can_walk_in_lava?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground underwater
   * @default false */
  is_amphibious?: boolean;
};
export type EntityMinecraftNavigationWalk = {
  /** Tells the pathfinder that it can path through through the air. */
  can_float?: boolean;
  /** List of block descriptors that the pathfinder should avoid. Items can be block identifier strings or objects with name/tags properties.
  
  Sample values:
  • breeze: [{"tags":"query.any_tag('trapdoors')"}] */
  blocks_to_avoid?: string[] | (Array<{
      /** Molang expression to match block tags, e.g. query.any_tag('trapdoors') */
      tags?: string | number;
      /** Block identifier to avoid. */
      name?: string;
    }>);
  /** Tells the pathfinder whether or not it can jump out of water (like a dolphin)
   * @default false */
  can_breach?: boolean;
  /** Tells the pathfinder that it can path through a closed door and break it
   * @default false */
  can_break_doors?: boolean;
  /** Tells the pathfinder whether or not it can jump up blocks
   * @default true */
  can_jump?: boolean;
  /** Tells the pathfinder that it can path through a closed door assuming the AI will open the door
   * @default false */
  can_open_doors?: boolean;
  /** Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door
   * @default false */
  can_open_iron_doors?: boolean;
  /** Tells the pathfinder to avoid water when creating a path
  
  Sample values:
  • blaze: true
   * @default false */
  avoid_water?: boolean;
  /** Tells the pathfinder to avoid blocks that cause damage when finding a path
  
  Sample values:
  • blaze: true
   * @default false */
  avoid_damage_blocks?: boolean;
  /** Tells the pathfinder to avoid portals (like nether portals) when finding a path
   * @default false */
  avoid_portals?: boolean;
  /** Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths
  
  Sample values:
  • bogged: true
   * @default false */
  avoid_sun?: boolean;
  /** Whether a path can be created through a door
   * @default true */
  can_pass_doors?: boolean;
  /** Tells the pathfinder that it can start pathing when in the air
   * @default false */
  can_path_from_air?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the lava
   * @default false */
  can_path_over_lava?: boolean;
  /** Tells the pathfinder whether or not it can travel on the surface of the water
  
  Sample values:
  • blaze: true
   * @default false */
  can_path_over_water?: boolean;
  /** Tells the pathfinder whether or not it will be pulled down by gravity while in water
   * @default true */
  can_sink?: boolean;
  /** Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path
   * @default false */
  can_swim?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground outside water
   * @default true */
  can_walk?: boolean;
  /** Tells the pathfinder whether or not it can travel in lava like walking on ground
   * @default false */
  can_walk_in_lava?: boolean;
  /** Tells the pathfinder whether or not it can walk on the ground underwater
  
  Sample values:
  • bogged: true
   * @default false */
  is_amphibious?: boolean;
  /** 
  
  Sample values:
  • blaze: true */
  using_door_annotation?: string;
};
export type EntityMinecraftOnDeath = {
  /** The event to run when the conditions for this trigger are met.
   * @default "" */
  event?: string | EventRef;
  /** Filters allow data objects to specify test criteria which allows their use. Filters can be defined by a single object of type (Filter Test), an array of tests, collection groups, or a combination of these objects. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The target of the event.
   * @default "self" */
  target?: "baby" | "block" | "damager" | "holder" | "item" | "other" | "parent" | "player" | "self" | "target";
};
export type EntityMinecraftOnFriendlyAnger = {
  /** The event to run when the conditions for this trigger are met.
  
  Sample values:
  • polar_bear: minecraft:on_anger
  • trader_llama: minecraft:defend_wandering_trader
   * @default "" */
  event?: string | EventRef;
  /** Filters allow data objects to specify test criteria which allows their use. Filters can be defined by a single object of type (Filter Test), an array of tests, collection groups, or a combination of these objects. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The target of the event.
  
  Sample values:
  • polar_bear: self
   * @default "self" */
  target?: "baby" | "block" | "damager" | "holder" | "item" | "other" | "parent" | "player" | "self" | "target";
};
export type EntityMinecraftOnHurt = {
  /** The event to run when the conditions for this trigger are met.
  
  Sample values:
  • blaze: minecraft:on_hurt_event
  • ender_crystal: minecraft:crystal_explode
   * @default "" */
  event?: string | EventRef;
  /** Filters allow data objects to specify test criteria which allows their use. Filters can be defined by a single object of type (Filter Test), an array of tests, collection groups, or a combination of these objects. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The target of the event.
  
  Sample values:
  • blaze: self
   * @default "self" */
  target?: "baby" | "block" | "damager" | "holder" | "item" | "other" | "parent" | "player" | "self" | "target";
};
export type EntityMinecraftOnHurtByPlayer = {
  /** The event to run when the conditions for this trigger are met.
  
  Sample values:
  • blaze: minecraft:on_hurt_event
   * @default "" */
  event?: string | EventRef;
  /** Filters allow data objects to specify test criteria which allows their use. Filters can be defined by a single object of type (Filter Test), an array of tests, collection groups, or a combination of these objects. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The target of the event.
  
  Sample values:
  • blaze: self
   * @default "self" */
  target?: "baby" | "block" | "damager" | "holder" | "item" | "other" | "parent" | "player" | "self" | "target";
};
export type EntityMinecraftOnIgnite = {
  /** The event to run when the conditions for this trigger are met.
   * @default "" */
  event?: string | EventRef;
  /** Filters allow data objects to specify test criteria which allows their use. Filters can be defined by a single object of type (Filter Test), an array of tests, collection groups, or a combination of these objects. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The target of the event.
   * @default "self" */
  target?: "baby" | "block" | "damager" | "holder" | "item" | "other" | "parent" | "player" | "self" | "target";
};
export type EntityMinecraftOnStartLanding = {
  /** The event to run when the conditions for this trigger are met.
  
  Sample values:
  • ender_dragon: minecraft:start_land
   * @default "" */
  event?: string | EventRef;
  /** Filters allow data objects to specify test criteria which allows their use. Filters can be defined by a single object of type (Filter Test), an array of tests, collection groups, or a combination of these objects. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The target of the event.
  
  Sample values:
  • ender_dragon: self
   * @default "self" */
  target?: "baby" | "block" | "damager" | "holder" | "item" | "other" | "parent" | "player" | "self" | "target";
};
export type EntityMinecraftOnStartTakeoff = {
  /** The event to run when the conditions for this trigger are met.
  
  Sample values:
  • ender_dragon: minecraft:start_fly
   * @default "" */
  event?: string | EventRef;
  /** Filters allow data objects to specify test criteria which allows their use. Filters can be defined by a single object of type (Filter Test), an array of tests, collection groups, or a combination of these objects. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The target of the event.
  
  Sample values:
  • ender_dragon: self
   * @default "self" */
  target?: "baby" | "block" | "damager" | "holder" | "item" | "other" | "parent" | "player" | "self" | "target";
};
export type EntityMinecraftOnTargetAcquired = {
  /** The event to run when the conditions for this trigger are met.
  
  Sample values:
  • cave_spider: minecraft:become_angry
  • drowned: minecraft:has_target
  • llama: minecraft:mad_at_wolf
   * @default "" */
  event?: string | EventRef;
  /** Filters allow data objects to specify test criteria which allows their use. Filters can be defined by a single object of type (Filter Test), an array of tests, collection groups, or a combination of these objects.
  
  Sample values:
  • llama: {"all_of":[{"test":"is_family","subject":"targe... */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The target of the event.
  
  Sample values:
  • drowned: self
   * @default "self" */
  target?: "baby" | "block" | "damager" | "holder" | "item" | "other" | "parent" | "player" | "self" | "target";
};
export type EntityMinecraftOnTargetEscape = {
  /** The event to run when the conditions for this trigger are met.
  
  Sample values:
  • drowned: minecraft:lost_target
  • llama: minecraft:on_calm
  • magma_cube: minecraft:become_calm
   * @default "" */
  event?: string | EventRef;
  /** Filters allow data objects to specify test criteria which allows their use. Filters can be defined by a single object of type (Filter Test), an array of tests, collection groups, or a combination of these objects.
  
  Sample values:
  • llama: {"all_of":[{"test":"is_family","subject":"targe... */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The target of the event.
  
  Sample values:
  • dolphin: self
   * @default "self" */
  target?: "baby" | "block" | "damager" | "holder" | "item" | "other" | "parent" | "player" | "self" | "target";
};
export type EntityMinecraftOnWakeWithOwner = {
  /** The event to run when the conditions for this trigger are met. */
  event?: string | EventRef;
  /** The list of conditions for this trigger to execute. */
  filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** The target of the event.
   * @default "self" */
  target?: string;
};
export type EntityMinecraftOutOfControl = Record<string, unknown>;
export type EntityMinecraftPeek = {
  /** Event to call when the entity is done peeking.
  
  Sample values:
  • shulker: {"event":"minecraft:on_close"} */
  on_close?: string | ({
      event?: string | EventRef;
      target?: string;
    });
  /** Event to call when the entity starts peeking.
  
  Sample values:
  • shulker: {"event":"minecraft:on_open"} */
  on_open?: string | ({
      event?: string | EventRef;
      target?: string;
    });
  /** Event to call when the entity's target entity starts peeking.
  
  Sample values:
  • shulker: {"event":"minecraft:on_open"} */
  on_target_open?: string | ({
      event?: string | EventRef;
      target?: string;
    });
};
export type EntityMinecraftPersistent = Record<string, unknown>;
export type EntityMinecraftPhysics = {
  /** Whether or not the entity collides with things.
   * @default true */
  has_collision?: boolean;
  /** Whether or not the entity is affected by gravity.
   * @default true */
  has_gravity?: boolean;
  /** Whether or not the entity should be pushed towards the nearest open area when stuck inside a block.
   * @default false */
  push_towards_closest_space?: boolean;
};
export type EntityMinecraftPlayerExhaustion = {
  /** The initial value of a player's exhaustion level. */
  value?: number;
  /** A maximum value for a player's exhaustion.
  
  Sample values:
  • player: 20 */
  max?: number;
};
export type EntityMinecraftPlayerExperience = {
  /** The initial value of the player experience.
   * @default 1 */
  value?: number;
  /** The maximum player experience of this entity.
  
  Sample values:
  • player: 1
   * @default 5 */
  max?: number;
};
export type EntityMinecraftPlayerLevel = {
  /** The initial value of the player level. */
  value?: number;
  /** The maximum player level value of the entity.
  
  Sample values:
  • player: 24791 */
  max?: number;
};
export type EntityMinecraftPlayerSaturation = {
  /** The initial value of player saturation.
  
  Sample values:
  • player: 5 */
  value?: number;
  /** The maximum player saturation value.
  
  Sample values:
  • player: 20 */
  max?: number;
};
export type EntityMinecraftPreferredPath = {
  /** A list of block types with their associated pathfinding costs. Each entry specifies blocks and their cost value.
  
  Sample values:
  • iron_golem: [{"blocks":["grass_path"],"cost":0},{"blocks":[... */
  preferred_path_blocks?: EntityPreferredpathBlockset[];
  /** Cost for non - preferred blocks
  
  Sample values:
  • iron_golem: 1.5
   * @default 0 */
  default_block_cost?: number;
  /** Added cost for jumping up a node
  
  Sample values:
  • iron_golem: 5
   * @default 0 */
  jump_cost?: number;
  /** Distance mob can fall without taking damage
  
  Sample values:
  • iron_golem: 1
  • warden: 20
   * @default 3 */
  max_fall_blocks?: number;
};
export type EntityPreferredpathBlockset = {
  /** List of preferred blocks */
  blocks?: (Array<{
      /** Name
       * @default "" */
      name?: string;
      /** States */
      states?: number | string | boolean;
      /** Tags
       * @default "" */
      tags?: string;
    }>) | string | Record<string, unknown>;
  /** Cost for preferred blocks */
  cost?: number;
};
export type EntityMinecraftProjectile = {
  /** Determines whether the entity hit will be set on fire. Note: the presence of this field in the component definition causes targets to catch fire regardless of the value set. To prevent fire, remove this field entirely from the component.
   * @default false */
  catch_fire?: boolean;
  /** If true, this projectile will be reflected back when hit by another projectile or by taking damage.
   * @default false */
  reflect_on_hurt?: boolean;
  /** If true, this projectile is not affected by outside forces such as friction and drag.
  
  *Introduced in version 1.26.20*
   * @default true */
  isolated_physics?: boolean;
  /** Reference point on the shooter used to position the projectile at spawn: `0` = origin (feet), `1` = eye height, `2` = middle of the bounding box.
   * @default "origin" */
  anchor?: "eye_height" | "middle" | "origin";
  /** Additional upwards pitch (in degrees) applied to the shooter's aim direction at launch. Negative values aim downward.
   * @default 0 */
  angle_offset?: number;
  /** If `true`, critical-hit particles are spawned on the projectile when it is struck.
   * @default false */
  crit_particle_on_hurt?: boolean;
  /** If `true`, the projectile is removed from the world when struck.
   * @default false */
  destroy_on_hurt?: boolean;
  /** Downward acceleration (blocks per tick squared) applied each tick while in flight. Higher values make the projectile fall faster.
   * @default 0.05000000074505806 */
  gravity?: number;
  /** Identifier of the sound to play when the projectile hits a block. Defaults to `hit_sound` when empty.
   * @default "" */
  hit_ground_sound?: string;
  /** If `true`, when the projectile hits a vehicle with at least one passenger, the on-hit behavior is applied to the passenger closest to the impact point instead of the vehicle itself.
   * @default false */
  hit_nearest_passenger?: boolean;
  /** Identifier of the sound to play when the projectile hits an entity. Also used for block hits when `hit_ground_sound` is not specified.
   * @default "" */
  hit_sound?: string;
  /** If `true`, the projectile treats water as a hit surface and stops on contact.
   * @default false */
  hit_water?: boolean;
  /** If `true`, the projectile steers towards an active target while in flight.
   * @default false */
  homing?: boolean;
  /** Array of entity identifiers that the projectile will pass through without registering a hit. */
  ignored_entities?: string[];
  /** Fraction of the projectile's velocity preserved each tick while traveling through air. Values below `1.0` cause it to slow down over time.
   * @default 0.9900000095367432 */
  inertia?: number;
  /** If `true`, the projectile is flagged as dangerous, affecting AI reactions and certain client-side behaviors.
   * @default false */
  is_dangerous?: boolean;
  /** If `true`, the projectile can channel a lightning bolt when it hits an entity during a thunderstorm.
   * @default false */
  lightning?: boolean;
  /** Fraction of the projectile's velocity preserved each tick while traveling through a fluid.
   * @default 0.6000000238418579 */
  liquid_inertia?: number;
  /** If `true`, the projectile can hit more than one entity over the course of its flight; if `false`, it stops at the first entity it hits. Projectiles launched with the Piercing enchantment have this value set to `true`.
   * @default false */
  multiple_targets?: boolean;
  /** Offset, relative to the `anchor`, at which the projectile is spawned when fired by the shooter. */
  offset?: number[] | ({
      /** X
       * @default 0 */
      x?: number;
      /** Y
       * @default 0 */
      y?: number;
      /** Z
       * @default 0 */
      z?: number;
    });
  /** Duration in seconds for which an entity set on fire by this projectile remains burning. Applied both by the legacy top-level `catch_fire` flag and by the `catch_fire` on-hit subcomponent.
   * @default 5 */
  on_fire_time?: number;
  /** Map of on-hit subcomponents that drive what happens when the projectile impacts a block, fluid, or entity. Each key is a subcomponent name and its value is that subcomponent's configuration. */
  on_hit?: EntityOnhitcommandsstorage;
  /** Particle effect emitted at the impact location when the projectile hits something.
   * @default "iconcrack" */
  particle?: "balloongas" | "bleach" | "blockforcefield" | "blueflame" | "breezewindexplosion" | "bubble" | "bubblecolumndown" | "bubblecolumnup" | "bubblemanual" | "campfiresmoke" | "campfiresmoketall" | "candleflame" | "carrotboost" | "coloredflame" | "conduit" | "creakingcrumble" | "crit" | "dragonbreath" | "dragonbreathfire" | "dragonbreathtrail" | "dragondestroyblock" | "driphoney" | "driplava" | "dripwater" | "dustplume" | "electricspark" | "enchantingtable" | "endrod" | "evaporation" | "explode" | "eyeblossomclose" | "eyeblossomopen" | "fallingborderdust" | "fallingdust" | "fireworks" | "fireworksoverlay" | "fireworksstarter" | "flame" | "food" | "greenflame" | "heart" | "hugeexplosion" | "iconcrack" | "ink" | "largeexplode" | "largesmoke" | "lava" | "mobappearance" | "mobflame" | "mobspell" | "mobspellambient" | "mobspellinstantaneous" | "myceliumdust" | "none" | "note" | "obsidiantear" | "orangepoplarleaves" | "paleoakleaves" | "pausemobgrowth" | "portal" | "portalreverse" | "rainsplash" | "reddust" | "redpoplarleaves" | "resetmobgrowth" | "risingborderdust" | "sculksoul" | "shriek" | "shulkerbullet" | "slime" | "smoke" | "sneeze" | "snowballpoof" | "snowflake" | "sonicexplosion" | "soul" | "sparkler" | "spit" | "stalactitedriplava" | "stalactitedripwater" | "sulfurcube" | "terrain" | "totem" | "townaura" | "trackingemitter" | "vaultconnection" | "villagerangry" | "villagerhappy" | "watersplash" | "watersplashmanual" | "waterwake" | "wax" | "whitesmoke" | "windexplosion" | "witchspell" | "wolfarmorcrack" | "yellowpoplarleaves";
  /** Default potion aux value associated with the projectile. Normally set programmatically by potion items; rarely useful at authoring time. A value matching the water potion is required for the `douse_fire` on-hit subcomponent to extinguish fires.
   * @default -1 */
  potion_effect?: number;
  /** Initial speed (in blocks per tick) at which the projectile is launched.
   * @default 1.2999999523162842 */
  power?: number;
  /** Duration in seconds after launch during which the projectile cannot be reflected by being struck.
   * @default 0 */
  reflect_immunity?: number;
  /** Identifier of the sound to play when the projectile is fired.
   * @default "" */
  shoot_sound?: string;
  /** If `true`, the projectile is aimed at the shooter's current target (when one exists) rather than straight ahead.
   * @default true */
  shoot_target?: boolean;
  /** Controls whether the projectile bounces off entities on impact. `no` disables bouncing, `if_invulnerable` bounces only off invulnerable entities, and `if_no_damage_dealt` bounces whenever no damage is dealt to the target.
   * @default "no" */
  should_bounce?: "if_invulnerable" | "if_no_damage_dealt" | "no";
  /** Splash radius (in blocks) used when applying potion effects via the splash/lingering potion code path.
   * @default 4 */
  splash_range?: number;
  /** If `true`, the projectile has its velocity zeroed out when struck.
   * @default false */
  stop_on_hurt?: boolean;
  /** Base inaccuracy added to the launch direction. The total inaccuracy is `uncertainty_base - difficultyLevel * uncertainty_multiplier`.
   * @default 0 */
  uncertainty_base?: number;
  /** Per-difficulty-level reduction in inaccuracy. See `uncertainty_base` for the full formula.
   * @default 0 */
  uncertainty_multiplier?: number;
  /** Number of ticks immediately after launch during which the projectile cannot hit its own shooter.
   * @default 5 */
  owner_launch_immunity_ticks?: number;
};
export type EntityOnhitcommandsstorage = {
  /** Variant of `mob_effect` that derives the effects from the arrow's tipped-potion data and splits durations across the standard eight-arrow stack. */
  arrow_effect?: EntityArroweffectsubcomponentdefinition;
  /** Causes the projectile to embed itself in the block it hits. */
  catch_fire?: EntityCatchfiresubcomponentdefinition;
  /** Fires an entity event on the shooter, the projectile, the entity hit, and/or all entities in a splash radius. */
  definition_event?: EntityActordefinitioneventsubcomponentdefinition | string | EventRef;
  /** When the projectile is a water-effect potion, extinguishes fires and campfires at and around the hit block. */
  douse_fire?: Record<string, unknown>;
  /** Freezes nearby water blocks to ice in a configurable volume around the impact (Education Edition chemistry feature). */
  freeze_on_hit?: EntityFreezeonhitsubcomponentdefinition;
  /** Drops experience orbs at the impact location. */
  grant_xp?: EntityGrantxpsubcomponentdefinition;
  /** Damages the projectile's owner when the projectile lands. */
  hurt_owner?: EntityHurtownersubcomponentdefinition;
  /** Triggers the entity's `on_ignite` definition when the projectile hits. */
  ignite?: Record<string, unknown>;
  /** Deals damage to the entity that was hit and optionally applies knockback, fire, channeling, and critical-hit scaling. */
  impact_damage?: EntityImpactdamagesubcomponentdefinition;
  /** Applies one or more mob effects to the entity hit. Effects are described with an `effects` array of effect objects. */
  mob_effect?: EntityMobeffectsubcomponentdefinition;
  /** Emits a particle effect at the impact location, optionally only for entity hits or only for non-entity hits. */
  particle_on_hit?: EntityParticleonhitsubcomponentdefinition;
  /** Removes the projectile from the world when it hits a block, entity, or (if `hit_water` is set) water. */
  remove_on_hit?: Record<string, unknown>;
  /** Spawns an area effect cloud at the impact point that applies potion effects to entities inside it over time */
  spawn_aoe_cloud?: EntitySpawnaoecloudsubcomponentdefinition;
  /** Conditionally spawns one or two groups of entities at the impact location and optionally fires events on each spawned entity. */
  spawn_chance?: EntitySpawnchancesubcomponentdefinition;
  /** Causes the projectile to embed itself in the block it hits. */
  stick_in_ground?: EntityStickingroundsubcomponentdefinition;
  /** Teleports the projectile's owner to the impact location. */
  teleport_owner?: Record<string, unknown>;
  /** Applies the splash-potion effects of a thrown potion to nearby entities at the impact point. */
  thrown_potion_effect?: EntityThrownpotioneffectsubcomponentdefinition;
  /** Releases an outward wind burst at the impact point that pushes nearby entities away. */
  wind_burst_on_hit?: Record<string, unknown>;
};
export type EntityArroweffectsubcomponentdefinition = {
  /** If `true`, effects are still applied to targets that blocked the projectile.
   * @default true */
  apply_effect_to_blocking_targets?: boolean;
};
export type EntityCatchfiresubcomponentdefinition = {
  /** If `true`, the block-ignition behavior is suppressed when the shooter is a mob and the `mobGriefing` game rule is off.
   * @default false */
  fire_affected_by_griefing?: boolean;
  /** Duration in seconds for which entity remains on fire
   * @default 0 */
  on_fire_time?: number;
};
export type EntityActordefinitioneventsubcomponentdefinition = {
  /** If `true`, the event is fired on the projectile entity itself.
   * @default false */
  affect_projectile?: boolean;
  /** If `true`, the event is fired on the projectile's shooter.
   * @default false */
  affect_shooter?: boolean;
  /** If `true`, the event is fired on every entity within `splash_area` blocks of the impact.
   * @default false */
  affect_splash_area?: boolean;
  /** If `true`, the event is fired on the entity hit by the projectile.
   * @default false */
  affect_target?: boolean;
  /** Event trigger (with optional filters) to fire on the selected target(s). */
  event_trigger?: EntityActordefinitiontrigger;
  /** Radius (in blocks) used by `affect_splash_area`.
   * @default 0 */
  splash_area?: number;
};
export type EntityFreezeonhitsubcomponentdefinition = {
  /** Shape of the freezing volume. Allowed values: `cube`, `sphere`.
   * @default "cube" */
  shape?: "cube" | "sphere";
  /** Half-extent of the freezing volume (in blocks).
   * @default 0 */
  size?: number;
  /** If `true`, the freezing volume is centered on the hit block's center instead of the precise impact point.
   * @default false */
  snap_to_block?: boolean;
};
export type EntityGrantxpsubcomponentdefinition = {
  /** Maximum amount of experience to drop.
   * @default 0 */
  maxXP?: number;
  /** Minimum amount of experience to drop.
   * @default 0 */
  minXP?: number;
};
export type EntityHurtownersubcomponentdefinition = {
  /** If `true`, the damage sets the owner on fire.
   * @default false */
  ignite?: boolean;
  /** If `true`, the damage applies knockback to the owner.
   * @default false */
  knockback?: boolean;
  /** Amount of damage to deal to the owner.
   * @default 0 */
  owner_damage?: number;
};
export type EntityImpactdamagesubcomponentdefinition = {
  /** If `true`, knockback is still applied to targets that successfully blocked the hit.
   * @default false */
  apply_knockback_to_blocking_targets?: boolean;
  /** If `true`, the entity hit is set on fire (uses the projectile's `on_fire_time`).
   * @default false */
  catch_fire?: boolean;
  /** If `true`, rounds the projectile's damage up to the next integer before the critical-hit multiplier is applied.
   * @default false */
  ceil_pre_critical_damage?: boolean;
  /** If `true`, the projectile can call down a lightning bolt on the entity hit during a thunderstorm.
   * @default false */
  channeling?: boolean;
  /** Range of damage to apply on impact. A random value in `[min, max]` is rolled per hit and the velocity-scaled `power_multiplier` term is added to it to define the projectile's base damage. */
  damage?: number | [number, number] | Floatrange;
  /** If `true`, the projectile is removed when it deals damage to an entity.
   * @default false */
  destroy_on_hit?: boolean;
  /** If `true`, `destroy_on_hit` only triggers when at least one point of damage is actually dealt (targets that fully absorb damage will not destroy the projectile).
   * @default true */
  destroy_on_hit_requires_damage?: boolean;
  /** Controls how world difficulty contributes to the rolled damage. `none` ignores difficulty, `additive` adds a difficulty-driven term on top of the base damage, and `multiplicative` folds the difficulty term into `power_multiplier` before scaling by velocity.
   * @default "none" */
  difficulty_randomization?: "additive" | "multiplicative" | "none";
  /** Entity family or type that the projectile is restricted to damaging. Entities outside the filter are not damaged.
   * @default "" */
  filter?: string;
  /** If `true`, the entity hit is knocked back away from the projectile.
   * @default false */
  knockback?: boolean;
  /** If specified, sets the maximum damage after critical damage has been applied. Enchantments have already been applied at this point, so this clamps the final damage value of critical hits.
   * @default 2147483647 */
  max_critical_damage?: number;
  /** If specified, sets the minimum damage after critical damage has been applied. Enchantments have already been applied at this point, so this clamps the final damage value of critical hits.
   * @default 0 */
  min_critical_damage?: number;
  /** Multiplied by the projectile's velocity and added to the rolled `damage` to define the projectile's base damage, so it can be used on its own to scale damage by the projectile's velocity.
   * @default 0 */
  power_multiplier?: number;
  /** If `true`, the projectile only registers as the last hurt-by source on the target when at least one point of damage is actually dealt.
   * @default true */
  set_last_hurt_requires_damage?: boolean;
};
export type EntityMobeffectsubcomponentdefinition = {
  /** Array of effect objects. Each element may specify `effect` (name), `amplifier`, and per-difficulty durations `durationeasy`, `durationnormal`, `durationhard`. */
  effects?: EntityMobeffectinstance[];
};
export type EntityMobeffectinstance = {
  /** Amplifier
   * @default 1 */
  amplifier?: number;
  /** Durationeasy */
  durationeasy?: number | string;
  /** Durationhard */
  durationhard?: number | string;
  /** Durationnormal */
  durationnormal?: number | string;
  /** Effect
   * @default "" */
  effect?: string;
};
export type EntityParticleonhitsubcomponentdefinition = {
  /** Number of particles to spawn per hit.
   * @default 1 */
  num_particles?: number;
  /** If `true`, particles are spawned when the projectile hits an entity.
   * @default false */
  on_entity_hit?: boolean;
  /** If `true`, particles are spawned when the projectile hits something that is not an entity.
   * @default false */
  on_other_hit?: boolean;
  /** Map from item identifier to a filter group, used to select an item icon for `iconcrack`-style particles based on context (e.g. the projectile's owner). */
  particle_item_name?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | (Record<string, unknown> | (Array<{
      /** Evaluates all tests in the group, all must pass in order for the group to pass. */
      AND?: Record<string, unknown>;
      /** Evaluates all tests in the group, all must fail in order for the group to pass. */
      NOT?: Record<string, unknown>;
      /** Evaluates tests in the group, one or more must pass in order for the group to pass. */
      OR?: Record<string, unknown>;
      /** Evaluates all tests in the group, all must pass in order for the group to pass. */
      all?: Record<string, unknown>;
      /** Evaluates all tests in the group, all must pass in order for the group to pass. */
      all_of?: Record<string, unknown>;
      /** Evaluates tests in the group, one or more must pass in order for the group to pass. */
      any?: Record<string, unknown>;
      /** Evaluates tests in the group, one or more must pass in order for the group to pass. */
      any_of?: Record<string, unknown>;
      /** Evaluates all tests in the group, all must fail in order for the group to pass. */
      none_of?: Record<string, unknown>;
    }>));
  /** Particle type to spawn at the impact point.
   * @default "none" */
  particle_type?: "balloongas" | "bleach" | "blockforcefield" | "blueflame" | "breezewindexplosion" | "bubble" | "bubblecolumndown" | "bubblecolumnup" | "bubblemanual" | "campfiresmoke" | "campfiresmoketall" | "candleflame" | "carrotboost" | "coloredflame" | "conduit" | "creakingcrumble" | "crit" | "dragonbreath" | "dragonbreathfire" | "dragonbreathtrail" | "dragondestroyblock" | "driphoney" | "driplava" | "dripwater" | "dustplume" | "electricspark" | "enchantingtable" | "endrod" | "evaporation" | "explode" | "eyeblossomclose" | "eyeblossomopen" | "fallingborderdust" | "fallingdust" | "fireworks" | "fireworksoverlay" | "fireworksstarter" | "flame" | "food" | "greenflame" | "heart" | "hugeexplosion" | "iconcrack" | "ink" | "largeexplode" | "largesmoke" | "lava" | "mobappearance" | "mobflame" | "mobspell" | "mobspellambient" | "mobspellinstantaneous" | "myceliumdust" | "none" | "note" | "obsidiantear" | "orangepoplarleaves" | "paleoakleaves" | "pausemobgrowth" | "portal" | "portalreverse" | "rainsplash" | "reddust" | "redpoplarleaves" | "resetmobgrowth" | "risingborderdust" | "sculksoul" | "shriek" | "shulkerbullet" | "slime" | "smoke" | "sneeze" | "snowballpoof" | "snowflake" | "sonicexplosion" | "soul" | "sparkler" | "spit" | "stalactitedriplava" | "stalactitedripwater" | "sulfurcube" | "terrain" | "totem" | "townaura" | "trackingemitter" | "vaultconnection" | "villagerangry" | "villagerhappy" | "watersplash" | "watersplashmanual" | "waterwake" | "wax" | "whitesmoke" | "windexplosion" | "witchspell" | "wolfarmorcrack" | "yellowpoplarleaves";
};
export type EntitySpawnaoecloudsubcomponentdefinition = {
  /** If `true`, the projectile's owner can be affected by the cloud.
   * @default true */
  affect_owner?: boolean;
  /** How long, in seconds, the cloud persists before disappearing. */
  duration?: number | string;
  /** Particle effect emitted by the cloud.
   * @default "mobspellambient" */
  particle?: "balloongas" | "bleach" | "blockforcefield" | "blueflame" | "breezewindexplosion" | "bubble" | "bubblecolumndown" | "bubblecolumnup" | "bubblemanual" | "campfiresmoke" | "campfiresmoketall" | "candleflame" | "carrotboost" | "coloredflame" | "conduit" | "creakingcrumble" | "crit" | "dragonbreath" | "dragonbreathfire" | "dragonbreathtrail" | "dragondestroyblock" | "driphoney" | "driplava" | "dripwater" | "dustplume" | "electricspark" | "enchantingtable" | "endrod" | "evaporation" | "explode" | "eyeblossomclose" | "eyeblossomopen" | "fallingborderdust" | "fallingdust" | "fireworks" | "fireworksoverlay" | "fireworksstarter" | "flame" | "food" | "greenflame" | "heart" | "hugeexplosion" | "iconcrack" | "ink" | "largeexplode" | "largesmoke" | "lava" | "mobappearance" | "mobflame" | "mobspell" | "mobspellambient" | "mobspellinstantaneous" | "myceliumdust" | "none" | "note" | "obsidiantear" | "orangepoplarleaves" | "paleoakleaves" | "pausemobgrowth" | "portal" | "portalreverse" | "rainsplash" | "reddust" | "redpoplarleaves" | "resetmobgrowth" | "risingborderdust" | "sculksoul" | "shriek" | "shulkerbullet" | "slime" | "smoke" | "sneeze" | "snowballpoof" | "snowflake" | "sonicexplosion" | "soul" | "sparkler" | "spit" | "stalactitedriplava" | "stalactitedripwater" | "sulfurcube" | "terrain" | "totem" | "townaura" | "trackingemitter" | "vaultconnection" | "villagerangry" | "villagerhappy" | "watersplash" | "watersplashmanual" | "waterwake" | "wax" | "whitesmoke" | "windexplosion" | "witchspell" | "wolfarmorcrack" | "yellowpoplarleaves";
  /** Aux value of the potion whose effects the cloud applies. When `-1`, the potion is taken from the projectile entity itself.
   * @default -1 */
  potion?: number;
  /** Initial radius (in blocks) of the cloud.
   * @default 0 */
  radius?: number;
  /** Amount the radius shrinks (or grows) each time the cloud applies its effects. `-1` keeps the radius unchanged.
   * @default -1 */
  radius_on_use?: number;
  /** Number of ticks the cloud waits before re-applying its effects to the same entity.
   * @default 0 */
  reapplication_delay?: number;
};
export type EntitySpawnchancesubcomponentdefinition = {
  /** Percent chance (0-1.0) that the first group spawns.
   * @default 0 */
  first_spawn_chance?: number;
  /** Number of entities spawned when the first roll succeeds.
   * @default 0 */
  first_spawn_count?: number;
  /** Array of entity event triggers to fire on each spawned entity. */
  on_spawn?: EntityActordefinitiontrigger[];
  /** Percent chance (0-1.0) that the second group spawns (rolled independently of the first).
   * @default 0 */
  second_spawn_chance?: number;
  /** Number of entities spawned when the second roll succeeds.
   * @default 0 */
  second_spawn_count?: number;
  /** If `true`, spawned entities start as babies (where applicable).
   * @default false */
  spawn_baby?: boolean;
  /** Identifier of the entity definition to spawn.
   * @default "" */
  spawn_definition?: string;
};
export type EntityStickingroundsubcomponentdefinition = {
  /** Duration in seconds for which the projectile visually shakes after sticking.
   * @default 0 */
  shake_time?: number;
};
export type EntityThrownpotioneffectsubcomponentdefinition = {
  /** Aux value of the potion to apply.
   * @default -1 */
  effect?: number;
};
export type EntityMinecraftPushThrough = {
  /** The value of the entity's push-through, in blocks.
   * @default 0 */
  value?: number;
};
export type EntityMinecraftPushable = {
  /** Whether the entity can be pushed by other entities.
  
  Sample values:
  • allay: true
   * @default true */
  is_pushable?: boolean;
  /** Whether the entity can be pushed by pistons safely.
  
  Sample values:
  • allay: true
   * @default true */
  is_pushable_by_piston?: boolean;
};
export type EntityMinecraftRaidTrigger = {
  /** Event to run when a raid is triggered on the village. */
  triggered_event?: string | EventRef | ({
      event?: string | EventRef;
      target?: string;
    });
  /** 
  
  Properties:
  • triggered_event (string)
  
  Sample values:
  • player: {"triggered_event":{"event":"minecraft:remove_r... */
  "minecraft:raid_trigger"?: {
      /** 
      
      Sample values:
      • player: {"event":"minecraft:remove_raid_trigger","targe... */
      triggered_event?: string | EventRef;
    };
};
export type EntityMinecraftRailMovement = {
  /** Maximum speed that this entity will move at when on the rail.
   * @default 0.4 */
  max_speed?: number;
};
export type EntityMinecraftRailSensor = {
  /** If true, on tick this entity will trigger its on_deactivate behavior
  
  Sample values:
  • command_block_minecart: true
   * @default false */
  check_block_types?: boolean;
  /** If true, this entity will eject all of its riders when it passes over an activated rail
  
  Sample values:
  • minecart: true
   * @default true */
  eject_on_activate?: boolean;
  /** If true, this entity will eject all of its riders when it passes over a deactivated rail
   * @default false */
  eject_on_deactivate?: boolean;
  /** Event to call when the rail is activated
  
  Sample values:
  • command_block_minecart: {"event":"minecraft:command_block_activate"}
  • hopper_minecart: {"event":"minecraft:hopper_deactivate"}
  • tnt_minecart: {"event":"minecraft:on_prime","filters":{"all_o... */
  on_activate?: string | ({
      event?: string | EventRef;
      target?: string;
    });
  /** Event to call when the rail is deactivated
  
  Sample values:
  • command_block_minecart: {"event":"minecraft:command_block_deactivate"}
  • hopper_minecart: {"event":"minecraft:hopper_activate"} */
  on_deactivate?: string | ({
      event?: string | EventRef;
      target?: string;
    });
  /** If true, command blocks will start ticking when passing over an activated rail
  
  Sample values:
  • command_block_minecart: true
   * @default true */
  tick_command_block_on_activate?: boolean;
  /** If false, command blocks will stop ticking when passing over a deactivated rail
   * @default false */
  tick_command_block_on_deactivate?: boolean;
};
export type EntityMinecraftRavagerBlocked = {
  /** The strength with which blocking entities should be knocked back
   * @default 3 */
  knockback_strength?: number;
  /** A list of weighted responses to the melee attack being blocked
   * @default "[ ]" */
  reaction_choices?: string[];
};
export type EntityMinecraftReflectProjectiles = {
  /** [EXPERIMENTAL] A Molang expression defining the angle in degrees to add to the projectile's y axis rotation.
  
  Sample values:
  • breeze: 180.0 + Math.random(-20.0, 20.0)
   * @default "0" */
  azimuth_angle?: string;
  /** [EXPERIMENTAL] A Molang expression defining the angle in degrees to add to the projectile's x axis rotation.
   * @default "0" */
  elevation_angle?: string;
  /** [EXPERIMENTAL] An array of strings defining the types of projectiles that are reflected when they hit the entity.
  
  Sample values:
  • breeze: ["xp_bottle","thrown_trident","shulker_bullet",... */
  reflected_projectiles?: string[];
  /** [EXPERIMENTAL] A Molang expression defining the velocity scaling of the reflected projectile. Values below 1 decrease the projectile's velocity, and values above 1 increase it.
  
  Sample values:
  • breeze: 0.5
   * @default "1" */
  reflection_scale?: string;
  /** [EXPERIMENTAL] A string defining the name of the sound event to be played when a projectile is reflected. "reflect" unless specified.
   * @default "reflect" */
  reflection_sound?: string;
};
export type EntityMinecraftRendersWhenInvisible = Record<string, unknown>;
export type EntityMinecraftRideable = {
  /** The number of entities that can ride this entity at the same time.
  
  Sample values:
  • chicken: 1
   * @default 1 */
  seat_count?: number;
  /** If true, this entity can't be interacted with if the entity interacting with it is crouching.
  
  Sample values:
  • llama: true
   * @default true */
  crouching_skip_interact?: boolean;
  /** The seat that designates the driver of the entity. Entities with the "minecraft:behavior.controlled_by_player" goal ignore this field and give control to any player in any seat.
   * @default 0 */
  controlling_seat?: number;
  /** [DEPRECATED] 
  
  *⚠️ Deprecated*
   * @deprecated */
  pulls_in_entities?: boolean;
  /** If true, this entity will be picked when looked at by the rider.
   * @default false */
  rider_can_interact?: boolean;
  /** Event to execute on the owner entity when an entity starts riding it.
  
  *Introduced in version 1.21.80* */
  on_rider_enter_event?: string | EventRef;
  /** Event to execute on the owner entity when an entity stops riding it.
  
  *Introduced in version 1.21.80* */
  on_rider_exit_event?: string | EventRef;
  /** Defines where riders are placed when dismounting this entity:
  - "default", riders are placed on a valid ground position around the entity, or at the center of the entity's collision box if none is found.
  - "on_top_center", riders are placed at the center of the top of the entity's collision box.
  
  *Introduced in version 1.21.80*
  
  Sample values:
  • cushion: on_top_center
   * @default "default" */
  dismount_mode?: "default" | "on_top_center";
  /** The list of positions and number of riders for each position for entities riding this entity.
  
  Sample values:
  • chicken: {"position":[0,0.48,0]}
  • cow: {"position":[0,1,0]}
  • cow: {"position":[0,1.15,0]} */
  seats?: (Array<{
      /** Camera radius to use for this seat when in third person or third person front camera. Overrides the default third-person camera distance for riders in this seat.
      
      *Introduced in version 1.21.80* */
      third_person_camera_radius?: number;
      /** Adds springiness to camera movement when the camera moves back to its radius after being pushed closer to the player by an obstacle.
      
      *Introduced in version 1.21.80* */
      camera_relax_distance_smoothing?: number;
      /** Offset to rotate riders by. Can be a number or a Molang expression.
       * @default 0 */
      rotate_rider_by?: string | number;
      /** Angle in degrees to rotate the rider by. Can be a number or a Molang expression.
       * @default 0 */
      lock_rider_rotation?: string | number;
    }>) | Record<string, unknown>;
  /** List of entities that can ride this entity.
  
  Sample values:
  • chicken: ["baby_undead"]
  • llama: ["player"] */
  family_types?: string[];
  /** The text to display when the player can interact with the entity when playing with touch-screen controls.
  
  Sample values:
  • cushion: action.interact.ride.cushion
  • llama: action.interact.mount
  • llama: action.interact.ride.horse */
  interact_text?: string;
  /** The max width a mob can have to be a rider. A value of 0 ignores this parameter.
   * @default 0 */
  passenger_max_width?: number;
  /** This field may exist in old data but isn't used by "minecraft:rideable". */
  priority?: number;
  /** If true, this entity will pull entities matching the specified "family_types" into any available seats. Entities that are leashed will only be pulled in if their distance to their leash holder is less than the "hard_distance" defined in their own "minecraft:leashable" component.
  
  Sample values:
  • minecart: true
   * @default false */
  pull_in_entities?: boolean;
};
export type EntityMinecraftRotationAxisAligned = Record<string, unknown>;
export type EntityMinecraftScale = {
  /** The scale multiplier for visual size. 1.0 = normal, 0.5 = half (babies), 2.0 = double size.
   * @default 1 */
  value?: number;
};
export type EntityMinecraftScaleByAge = {
  /** Ending scale of the entity when it's fully grown.
   * @default 1 */
  end_scale?: number;
  /** Initial scale of the newborn entity.
   * @default 1 */
  start_scale?: number;
};
export type EntityMinecraftScheduler = {
  /** The minimum the scheduler will be delayed. */
  min_delay_secs?: number;
  /** The maximum the scheduler will be delayed. */
  max_delay_secs?: number;
  /** The list of triggers that fire when the conditions match the given filter criteria. Can be an array of event objects or a single event object. */
  scheduled_events?: Array<Record<string, unknown>> | Record<string, unknown>;
};
export type EntityMinecraftShareables = {
  /** A bucket for all other items in the game. Note this category is always least priority items.
   * @default false */
  all_items?: boolean;
  /** Maximum number of this item the mob will hold.
   * @default -1 */
  all_items_max_amount?: number;
  /** Number of this item considered extra that the entity wants to share.
   * @default -1 */
  all_items_surplus_amount?: number;
  /** Number of this item this entity wants to share.
   * @default -1 */
  all_items_want_amount?: number;
  /** List of items or item tags that the entity wants to share. Items in-game will match to this list from top to bottom, meaning that the first occurance of a match, be it name or tag, will shadow those coming after.
  
  Sample values:
  • bogged: [{"item":"minecraft:netherite_sword","priority"...
  • drowned: [{"item":"minecraft:trident","priority":0,"surp... */
  items?: Array<{
      /** Mob will admire the item after picking up by looking at it. For this to happen the mob needs to have an Admire component and an Admire goal.
       * @default false */
      admire?: boolean;
      /** Mob will barter for the item after picking it up. For this to work the mob needs to have a Barter component and a Barter goal.
       * @default false */
      barter?: boolean;
      /** Determines whether the mob will consume the item or not.
       * @default false */
      consume_item?: boolean;
      /** Defines the item this entity wants to craft with the item defined by "item". Should be an item name. */
      craft_into?: string;
      /** The name of the item. Aux value can be specified, for instance 'minecraft:skull:1'. Alternatively, a tag can be specified to match all items with that tag. */
      item?: string;
      /** Maximum number of this item the mob will hold.
       * @default -1 */
      max_amount?: number;
      /** Maximum number items the mob will pick up during a single goal tick.
       * @default -1 */
      pickup_limit?: number;
      /** Determines whether the mob can only pickup the item and not drop it.
       * @default false */
      pickup_only?: boolean;
      /** Prioritizes which items the entity prefers. 0 is the highest priority.
       * @default 0 */
      priority?: number;
      /** Determines whether the mob will try to put the item in its inventory if it has the inventory component and if it can't be equipped.
       * @default false */
      stored_in_inventory?: boolean;
      /** Number of this item considered extra that the entity wants to share.
       * @default -1 */
      surplus_amount?: number;
      /** Number of this item this entity wants to share.
       * @default -1 */
      want_amount?: number;
    }>;
  /** Boolean value that controls if the mob is able to pick up more of the same item if it is already holding that item
   * @default false */
  singular_pickup?: boolean;
};
export type EntityMinecraftShooter = {
  /** Sound that is played when the shooter shoots a projectile.
  
  Sample values:
  • bogged: bow
  • drowned: item.trident.throw */
  sound?: string;
  /** List of projectiles that can be used by the shooter. Each entry can specify its own projectile definition and condition filters; entries are evaluated in order and the first match is used.
  
  *Introduced in version 1.19.60* */
  projectiles?: Array<Record<string, unknown>>;
  /** Velocity at which projectiles will be shot. A power of 0 falls back to the default projectile throw power.
  
  *Introduced in version 1.19.60*
   * @default 0 */
  power?: number;
  /** If set, the projectiles are flagged as magic and the ranged attack goal will not run at the same time as other magic goals (for example, drink_potion).
  
  *Introduced in version 1.19.60*
   * @default false */
  magic?: boolean;
  /** ID of the Potion effect for the default projectile to be applied on hit.
  
  Sample values:
  • bogged: 26
   * @default -1 */
  aux_val?: number;
  /** Actor definition to use as the default projectile for the ranged attack. The actor definition must have the projectile component to be able to be shot as a projectile.
  
  Sample values:
  • blaze: minecraft:small_fireball
  • bogged: minecraft:arrow
  • drowned: minecraft:thrown_trident */
  def?: string;
};
export type EntityMinecraftSittable = {
  /** Event to run when the entity enters the 'sit' state. Can be an object with event and target properties, or a simple event string. */
  sit_event?: EventTrigger | string | EventRef;
  /** Event to run when the entity exits the 'sit' state. Can be an object with event and target properties, or a simple event string. */
  stand_event?: EventTrigger | string | EventRef;
};
export type EntityMinecraftSkinId = {
  /** The ID of the skin. By convention, 0 is the ID of the base skin.
   * @default 0 */
  value?: number;
};
export type EntityMinecraftSoundVolume = {
  /** The value of the volume the entity uses for sound effects.
   * @default 1 */
  value?: number;
};
export type EntityMinecraftSpawnEntity = {
  /** List of entity spawn definitions. Can be a single object or an array of objects.
  
  Sample values:
  • chicken: [{"min_wait_time":300,"max_wait_time":600,"spaw...
  • drowned: {"max_wait_time":0,"min_wait_time":0,"num_to_sp...
  • sniffer: {"min_wait_time":0,"max_wait_time":0,"spawn_sou... */
  entities?: (Array<{
      /** If present, the specified entity will only spawn if the filter evaluates to true.
      
      Sample values:
      • chicken: [{"test":"rider_count","subject":"self","operat... */
      filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
          all_of?: Array<Record<string, unknown>>;
          any_of?: Array<Record<string, unknown>>;
          none_of?: Array<Record<string, unknown>>;
        });
      /** 
      
      Sample values:
      • chicken: 300 */
      min_wait_time?: number;
      /** 
      
      Sample values:
      • chicken: 600 */
      max_wait_time?: number;
      /** 
      
      Sample values:
      • chicken: plop */
      spawn_sound?: string;
      /** 
      
      Sample values:
      • chicken: egg */
      spawn_item?: string;
    }>) | Record<string, unknown>;
  /** If present, the specified entity will only spawn if the filter evaluates to true. */
  filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** Maximum amount of time to randomly wait in seconds before another entity is spawned.
   * @default 600 */
  max_wait_time?: number;
  /** Minimum amount of time to randomly wait in seconds before another entity is spawned.
   * @default 300 */
  min_wait_time?: number;
  /** The number of entities of this type to spawn each time that this triggers.
   * @default 1 */
  num_to_spawn?: number;
  /** If true, this the spawned entity will be leashed to the parent.
   * @default false */
  should_leash?: boolean;
  /** If true, this component will only ever spawn the specified entity once.
   * @default false */
  single_use?: boolean;
  /** Identifier of the entity to spawn, leave empty to spawn the item defined by "spawn_item" instead. */
  spawn_entity?: string;
  /** Event to call on the spawned entity when it spawns.
   * @default "minecraft:entity_born" */
  spawn_event?: string | EventRef | ({
      event?: string | EventRef;
      target?: string;
    });
  /** Item identifier of the item to spawn.
   * @default "egg" */
  spawn_item?: string;
  /** Event to call on this entity when the item is spawned. */
  spawn_item_event?: string | EventRef | ({
      event?: string | EventRef;
      target?: string;
    });
  /** Method to use to spawn the entity.
   * @default "born" */
  spawn_method?: string;
  /** Identifier of the sound effect to play when the entity is spawned.
   * @default "plop" */
  spawn_sound?: string;
};
export type EntityMinecraftSpellEffects = {
  /** List of effects to add to this entity.
  
  Sample values:
  • player: [{"display_on_screen_animation":true,"duration"... */
  add_effects?: Array<{
      /** Whether to show a screen animation when this effect is applied. */
      display_on_screen_animation?: boolean;
      /** Effect to add to this entity. Includes 'duration' in seconds, 'amplifier' level, 'ambient' if it is to be considered an ambient effect, and 'visible' if the effect should be visible */
      effect?: string;
      /** Duration */
      duration?: number;
    }>;
  /** List of identifiers of effects to be removed from this entity after adding this component
  
  Sample values:
  • player: bad_omen */
  remove_effects?: string;
};
export type EntityMinecraftStrength = {
  /** The maximum strength of this entity
   * @default 5 */
  max?: number;
  /** The initial value of the strength
   * @default 1 */
  value?: number;
};
export type EntityMinecraftSuspectTracking = Record<string, unknown>;
export type EntityMinecraftTameable = {
  /** The chance of taming the entity with each item use between 0.0 and 1.0, where 1.0 is 100%
  
  Sample values:
  • parrot: 0.33
   * @default 1 */
  probability?: number;
  /** List of items that can be fed to an entity to tame them */
  tameItems?: string;
  /** Event to fire when the entity is tamed. Can be an object with event and target properties, or a simple event string.
  
  Sample values:
  • parrot: {"event":"minecraft:on_tame","target":"self"} */
  tame_event?: EventTrigger | string | EventRef;
  /** The list of items that can be used to tame this entity
  
  Sample values:
  • parrot: ["wheat_seeds","pumpkin_seeds","melon_seeds","b... */
  tame_items?: string[];
};
export type EntityMinecraftTamemount = {
  /** The amount the entity's temper will increase when mounted.
   * @default 5 */
  attempt_temper_mod?: number;
  /** The list of items that, if carried while interacting with the entity, will anger it. */
  auto_reject_items?: EntityMounttamingcomponentrejectitem[];
  /** The list of items that can be used to increase the entity's temper and speed up the taming process.
  
  Sample values:
  • llama: [{"item":"wheat","temper_mod":3},{"item":"hay_b... */
  feed_items?: EntityMounttamingcomponentfeeditem[];
  /** The text that shows in the feeding interact button.
  
  Sample values:
  • llama: action.interact.feed
   * @default "" */
  feed_text?: string;
  /** The maximum value for the entity's random starting temper.
  
  Sample values:
  • llama: 30
   * @default 100 */
  max_temper?: number;
  /** The minimum value for the entity's random starting temper.
   * @default 0 */
  min_temper?: number;
  /** The text that shows in the riding interact button.
  
  Sample values:
  • llama: action.interact.mount
   * @default "" */
  ride_text?: string;
  /** Event that triggers when the entity becomes tamed.
  
  Sample values:
  • llama: {"event":"minecraft:on_tame","target":"self"} */
  tame_event?: EntityActordefinitiontrigger | string | EventRef;
  /** The list of items that, if carried while interacting with the entity, will anger it. */
  autoRejectItems?: Array<{
      /** The list of items that, if carried while interacting with the entity, will anger it. */
      item?: string;
    }>;
};
export type EntityMounttamingcomponentrejectitem = {
  /** Name of the item this entity dislikes and will cause it to get angry if used while untamed. */
  item?: string | ({
      [key: string]: string;
    });
};
export type EntityMounttamingcomponentfeeditem = {
  /** Name of the item this entity likes and can be used to increase this entity's temper. */
  item?: string | ({
      [key: string]: string;
    });
  /** The amount of temper this entity gains when fed this item.
   * @default 0 */
  temper_mod?: number;
};
export type EntityMinecraftTargetNearbySensor = {
  /** Event to call when an entity gets in the inside range. Can be an object with event and target properties, or a simple event string.
  
  Sample values:
  • blaze: {"event":"switch_to_melee","target":"self"}
  • drowned: {"event":"minecraft:switch_to_melee","target":"... */
  on_inside_range?: Record<string, unknown> | string;
  /** Event to call when an entity gets outside the outside range. Can be an object with event and target properties, or a simple event string.
  
  Sample values:
  • blaze: {"event":"switch_to_ranged","target":"self"}
  • drowned: {"event":"minecraft:switch_to_ranged","target":... */
  on_outside_range?: Record<string, unknown> | string;
  /** Maximum distance in blocks that another entity will be considered in the 'inside' range
  
  Sample values:
  • blaze: 2
  • drowned: 3
   * @default 1 */
  inside_range?: number;
  /** Whether the other entity needs to be visible to trigger 'inside' events
  
  Sample values:
  • blaze: true
   * @default false */
  must_see?: boolean;
  /** Event to call when an entity exits visual range. Can specify 'event' for the name of the event and 'target' for the target of the event */
  on_vision_lost_inside_range?: string | ({
      event?: string | EventRef;
      target?: string;
    });
  /** Maximum distance in blocks that another entity will be considered in the 'outside' range
  
  Sample values:
  • blaze: 3
  • drowned: 5
   * @default 5 */
  outside_range?: number;
};
export type EntityMinecraftTeleport = {
  /** Modifies the chance that the entity will teleport if the entity is in darkness
   * @default 0.01 */
  dark_teleport_chance?: number;
  /** Modifies the chance that the entity will teleport if the entity is in daylight
   * @default 0.01 */
  light_teleport_chance?: number;
  /** Maximum amount of time in seconds between random teleports
   * @default 20 */
  max_random_teleport_time?: number;
  /** Minimum amount of time in seconds between random teleports
   * @default 0 */
  min_random_teleport_time?: number;
  /** Conditions that determine which projectiles cause the entity to attempt to teleport. If omitted, all projectiles cause a teleport attempt */
  projectile_filter?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** Entity will teleport to a random position within the area defined by this cube */
  random_teleport_cube?: [number, number, number];
  /** If true, the entity will teleport randomly
   * @default true */
  random_teleports?: boolean;
  /** Maximum distance the entity will teleport when chasing a target
   * @default 16 */
  target_distance?: number;
  /** The chance that the entity will teleport between 0.0 and 1.0. 1.0 means 100%
   * @default 1 */
  target_teleport_chance?: number;
  /** If true, the entity will attempt to teleport away from projectiles about to hit it
   * @default false */
  teleports_on_projectile_hit?: boolean;
};
export type EntityMinecraftTickWorld = {
  /** The distance at which the closest player has to be before this entity despawns. This option will be ignored if never_despawn is true.
   * @default 128 */
  distance_to_players?: number;
  /** If true, this entity will not despawn even if players are far away. If false, distance_to_players will be used to determine when to despawn.
   * @default true */
  never_despawn?: boolean;
  /** The area around the entity to tick.
   * @default 2 */
  radius?: number;
};
export type EntityMinecraftTimer = {
  /** Amount of time in seconds for the timer. Can be specified as a number or a pair of numbers (min and max). Incompatible with random_time_choices. */
  time?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** Event to fire when the time on the timer runs out. Can be an object with event and target properties, or a simple event string. */
  time_down_event?: EventTrigger | string | EventRef;
  /** If true, the timer will restart every time after it fires.
   * @default true */
  looping?: boolean;
  /** If true, the amount of time on the timer will be random between the min and max values specified in time.
   * @default true */
  randomInterval?: boolean;
  /** This is a list of objects, representing one value in seconds that can be picked before firing the event and an optional weight. Incompatible with time.
   * @default "[ ]" */
  random_time_choices?: string[];
};
export type EntityMinecraftTradeResupply = Record<string, unknown>;
export type EntityMinecraftTradeTable = {
  /** Determines when the mob transforms, if the trades should be converted when the new mob has a economy_trade_table. When the trades are converted, the mob will generate a new trade list with their new trade table, but then it will try to convert any of the same trades over to have the same enchantments and user data. For example, if the original has a Emerald to Enchanted Iron Sword (Sharpness 1), and the new trade also has an Emerald for Enchanted Iron Sword, then the enchantment will be Sharpness 1.
   * @default false */
  convert_trades_economy?: boolean;
  /** Name to be displayed while trading with this entity.
   * @default "" */
  display_name?: string;
  /** Used to determine if trading with entity opens the new trade screen.
   * @default false */
  new_screen?: boolean;
  /** Determines if the trades should persist when the mob transforms. This makes it so that the next time the mob is transformed to something with a trade_table or economy_trade_table, then it keeps their trades.
   * @default false */
  persist_trades?: boolean;
  /** File path relative to the behavior pack root for this entity's trades.
   * @default "" */
  table?: string;
};
export type EntityMinecraftTrail = {
  /** The type of block you wish to be spawned by the entity as it move about the world. Solid blocks may not be spawned at an offset of (0,0,0).
   * @default "air" */
  block_type?: string;
  /** One or more conditions that must be met in order to cause the chosen block type to spawn. */
  spawn_filter?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** The distance from the entities current position to spawn the block. Capped at up to 16 blocks away. The X value is left/right(-/+), the Z value is backward/forward(-/+), the Y value is below/above(-/+). */
  spawn_offset?: [number, number, number];
};
export type EntityMinecraftTransformation = {
  /** Defines the properties of the delay for the transformation. Can be a simple number (seconds) or a complex object.
  
  Sample values:
  • pig: 0.5 */
  delay?: ({
      /** Chance that the entity will look for nearby blocks that can speed up the transformation. Value must be between 0.0 and 1.0
       * @default 0 */
      block_assist_chance?: number;
      /** Chance that, once a block is found, will help speed up the transformation
       * @default 0 */
      block_chance?: number;
      /** Maximum number of blocks the entity will look for to aid in the transformation. If not defined or set to 0, it will be set to the block radius
       * @default 0 */
      block_max?: number;
      /** Distance in Blocks that the entity will search for blocks that can help the transformation
       * @default 0 */
      block_radius?: number;
      /** List of blocks that can help the transformation of this entity */
      block_types?: string[];
      /** Time in seconds to be added to value to have the maximum random time range value until the entity transforms (if non-zero then the time in seconds before the entity transforms will be random between value+range_min and value+range_max)
       * @default 0 */
      range_max?: number;
      /** Time in seconds to be added to value to have the minimum random time range value until the entity transforms (if non-zero then the time in seconds before the entity transforms will be random between value+range_min and value+range_max)
       * @default 0 */
      range_min?: number;
      /** Time in seconds before the entity transforms
       * @default 0 */
      value?: number;
    }) | number;
  /** List of components to add to the entity after the transformation */
  add?: Array<{
      /** Names of component groups to add */
      component_groups?: string[];
    }>;
  /** Sound to play when the transformation starts */
  begin_transform_sound?: string;
  /** Cause the entity to drop all equipment upon transformation
   * @default false */
  drop_equipment?: boolean;
  /** Cause the entity to drop all items in inventory upon transformation
  
  Sample values:
  • skeleton: true
   * @default false */
  drop_inventory?: boolean;
  /** Entity Definition that this entity will transform into
  
  Sample values:
  • pig: minecraft:pig_zombie
  • skeleton: minecraft:stray
  • stray: minecraft:skeleton */
  into?: string;
  /** If this entity has trades and has leveled up, it should maintain that level after transformation.
  
  Sample values:
  • skeleton: true
   * @default false */
  keep_level?: boolean;
  /** If this entity is owned by another entity, it should remain owned after transformation.
   * @default false */
  keep_owner?: boolean;
  /** Cause the entity to keep equipment after going through transformation
  
  Sample values:
  • skeleton: true
   * @default false */
  preserve_equipment?: boolean;
  /** Sound to play when the entity is done transforming
  
  Sample values:
  • pig: mob.pig.death
  • skeleton: convert_to_stray */
  transformation_sound?: string;
};
export type EntityMinecraftTransient = Record<string, unknown>;
export type EntityMinecraftTrust = Record<string, unknown>;
export type EntityMinecraftTrusting = {
  /** Event to run when this entity becomes trusting. Can be an object with event and target properties, or a simple event string. */
  trust_event?: EventTrigger | string | EventRef;
  /** The list of items that can be used to get the entity to trust players. Can be an array or a single item string. */
  trust_items?: string[] | string;
  /** The chance of the entity trusting with each item use between 0.0 and 1.0, where 1.0 is 100%.
   * @default 1 */
  probability?: number;
};
export type EntityMinecraftTypeFamily = {
  /** A set of tags that describe the categories of this entity. In addition to typically having a tag for the type of mob, entities frequently have additional type family tags that modify how the rest of the Minecraft world reacts to them.
  
  Sample values:
  • allay: ["allay","mob"]
  • armor_stand: ["armor_stand","inanimate","mob"]
  • arrow: ["projectile","arrow"] */
  family?: string[];
};
export type EntityMinecraftUnderwaterMovement = {
  /** Movement speed of the entity under water.
  
  Sample values:
  • dolphin: 0.15
  • elder_guardian: 0.3
  • guardian: 0.12 */
  value?: number;
};
export type EntityMinecraftVariableMaxAutoStep = {
  /** The maximum auto step height when on any other block.
   * @default 0.5625 */
  base_value?: number;
  /** The maximum auto step height when on any other block and controlled by the player.
   * @default 0.5625 */
  controlled_value?: number;
  /** The maximum auto step height when on a block that prevents jumping.
   * @default 0.5625 */
  jump_prevented_value?: number;
};
export type EntityMinecraftVariant = {
  /** The Id of the variant. By convention, 0 is the Id of the base entity/default appearance.
   * @default 0 */
  value?: number;
};
export type EntityMinecraftVibrationDamper = Record<string, unknown>;
export type EntityMinecraftVibrationListener = Record<string, unknown>;
export type EntityMinecraftWalkAnimationSpeed = {
  /** The higher the number, the faster the animation for walking plays. A value of 1.0 means normal speed, while 2.0 means twice as fast.
   * @default 1 */
  value?: number;
};
export type EntityMinecraftWantsJockey = Record<string, unknown>;
export type EntityMinecraftWaterMovement = {
  /** Drag factor to determine movement speed when in water.
  
  Sample values:
  • polar_bear: 0.98
   * @default 0.8 */
  drag_factor?: number;
};
export type EntityMinecraftWitherTargetHighestDamage = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** List of entity types the wither takes into account to find who dealt the most damage to it */
  entity_types?: Array<Record<string, unknown>> | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** Priority
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftApplyKnockbackRules = {
  /** Array of rules instances defining how knockback should be applied to the entity.
  
  Sample values:
  • drowned: [{"horizontal_power":0.6,"vertical_power":-0.6,...
  • egg: [{"vertical_power":0.1,"vertical_velocity_cap":...
  • iron_golem: [{"horizontal_power":0.52,"vertical_power":0.39... */
  presets?: EntityMinecraftApplyKnockbackRulesInstance[];
};
export type EntityMinecraftApplyKnockbackRulesInstance = {
  /** Whether or not the target should be fully immersed in water for the knockback rules to apply.
   * @default false */
  check_if_target_is_immersed_in_water?: boolean;
  /** Defines the approach for combining extra knockback from enchantments or sprinting:
  - "reapply_default": Reapplies knockback again with default knockback parameters, i.e. values not defined by this component.
  - "multiply_reduced": Multiplies the extra knockback with the base knockback and a reduction factor, and adds it to the base knockback.
   * @default "reapply_default" */
  extra_knockback_approach?: "multiply_reduced" | "reapply_default";
  /** Filter for the entity type that will be affected by these knockback rules. */
  filter?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Power with which a target should be knocked backwards.
   * @default 1 */
  horizontal_power?: number;
  /** Defines how knockback is applied to the target:
  - "relative_horizontal": Applies knockback along the horizontal direction from the attacker to the target.
  - "hit_direction": Applies knockback based on the hit direction and the point of impact (e.g. hits to the bottom of the entity or from below push it upward, hits on the left side of the entity push it to the right).
   * @default "relative_horizontal" */
  knockback_mode?: "hit_direction" | "relative_horizontal";
  /** Scaling factor to the magnitude of knockback based on the inverse square of the damage.
   * @default false */
  scale_with_damage?: boolean;
  /** Scaling factor to apply to the target's velocity before applying knockback.
   * @default 0.5 */
  slowdown_scale?: number;
  /** Power with which a target should be knocked upwards.
   * @default 0.4000000059604645 */
  vertical_power?: number;
  /** Maximum allowed Y velocity after target's knockback rules have been evaluated.
   * @default 0.4000000059604645 */
  vertical_velocity_cap?: number;
};
export type EntityMinecraftBehaviorAquaticChargeAttack = {
  /** Horizontal reach grown around the mob's AABB to register a hit.
   * @default 0.05000000074505806 */
  attack_reach?: number;
  /** Range of time in seconds to wait before starting another charge. */
  charge_cooldown_time?: number | [number, number] | Floatrange;
  /** Distance beyond the target the mob aims during a charge.
   * @default 1.5 */
  charge_overshoot_distance?: number;
  /** Absolute speed used during the charge attack.
   * @default 0.05999999865889549 */
  charge_speed?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Knockback force applied to the target on hit.
   * @default 2 */
  knockback_force?: number;
  /** Maximum distance at which the mob attempts a charge.
   * @default 16 */
  max_charge_distance?: number;
  /** Priority
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorAvoidBlock = {
  /** Event triggers that fire when the entity escapes from the avoided block. Can be a single trigger or an array of triggers. */
  on_escape?: Array<string | EntityActordefinitiontrigger>;
  /** The sound event to play when the mob is avoiding a block.
   * @default "undefined" */
  avoid_block_sound?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Maximum distance to look for a block in y.
   * @default 0 */
  search_height?: number;
  /** Maximum distance to look for a block in xz.
   * @default 0 */
  search_range?: number;
  /** The range of time in seconds to randomly wait before playing the sound again. */
  sound_interval?: number | [number, number] | Floatrange;
  /** Modifier for sprint speed. 1.0 means keep the regular speed, while higher numbers make the sprint speed faster.
   * @default 1 */
  sprint_speed_modifier?: number;
  /** List of block types this mob avoids. */
  target_blocks?: string | ({
      [key: string]: string;
    });
  /** Block search method.
   * @default "nearest" */
  target_selection_method?: string;
  /** Should start tick interval.
   * @default 1 */
  tick_interval?: number;
  /** Modifier for walking speed. 1.0 means keep the regular speed, while higher numbers make the walking speed faster.
   * @default 1 */
  walk_speed_modifier?: number;
};
export type EntityMinecraftBehaviorAvoidMobType = {
  /** The sound event to play when the mob is avoiding another mob.
   * @default "undefined" */
  avoid_mob_sound?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** The next target position the entity chooses to avoid another entity will be chosen within this XZ Distance.
   * @default 16 */
  avoid_target_xz?: number;
  /** The next target position the entity chooses to avoid another entity will be chosen within this Y Distance.
   * @default 7 */
  avoid_target_y?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The list of conditions another entity must meet to be a valid target to avoid.
  
  Sample values:
  • bogged: [{"filters":{"test":"is_family","subject":"othe...
  • cave_spider: [{"filters":{"all_of":[{"test":"is_family","sub...
  • dolphin: [{"filters":{"any_of":[{"test":"is_family","sub... */
  entity_types?: Array<Record<string, unknown>> | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** Whether or not to ignore direct line of sight while this entity is running away from other specified entities.
   * @default false */
  ignore_visibility?: boolean;
  /** Maximum distance to look for an avoid target for the entity.
   * @default 3 */
  max_dist?: number;
  /** How many blocks away from its avoid target the entity must be for it to stop fleeing from the avoid target.
   * @default 10 */
  max_flee?: number;
  /** Event that is triggered when escaping from a mob. */
  on_escape_event?: EntityActordefinitiontrigger | string | EventRef;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • bogged: 4
  • cave_spider: 2
  • guardian: 1
   * @default 0 */
  priority?: number;
  /** Percent chance this entity will stop avoiding another entity based on that entity's strength, where 1.0 = 100%.
  
  Sample values:
  • dolphin: 0.14
   * @default 1 */
  probability_per_strength?: number;
  /** Determine if we should remove target when fleeing or not.
   * @default false */
  remove_target?: boolean;
  /** Multiplier for speed when following river. 1.0 means keep the regular speed, while higher numbers make the speed faster.
   * @default 0.75 */
  river_speed_multiplier?: number;
  /** The range of time in seconds to randomly wait before playing the sound again. */
  sound_interval?: number | [number, number] | Floatrange;
  /** How many blocks within range of its avoid target the entity must be for it to begin sprinting away from the avoid target.
   * @default 7 */
  sprint_distance?: number;
  /** Multiplier for sprint speed. 1.0 means keep the regular speed, while higher numbers make the sprint speed faster.
   * @default 1 */
  sprint_speed_multiplier?: number;
  /** Multiplier for walking speed. 1.0 means keep the regular speed, while higher numbers make the walking speed faster.
   * @default 1 */
  walk_speed_multiplier?: number;
};
export type EntityMinecraftBehaviorCelebrate = {
  /** The sound event to trigger during the celebration.
   * @default "celebrate" */
  celebration_sound?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The duration in seconds that the celebration lasts for.
   * @default 30 */
  duration?: number;
  /** Minimum and maximum time between jumping (positive, in seconds). */
  jump_interval?: number | [number, number] | Floatrange;
  /** The event to trigger when the goal's duration expires. */
  on_celebration_end_event?: EntityActordefinitiontrigger | string | EventRef;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Minimum and maximum time between sound events (positive, in seconds). */
  sound_interval?: number | [number, number] | Floatrange;
};
export type EntityMinecraftBehaviorCelebrateSurvive = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The duration in seconds that the celebration lasts for.
   * @default 30 */
  duration?: number;
  /** Minimum and maximum time between firework (positive, in seconds). */
  fireworks_interval?: number | [number, number] | Floatrange;
  /** The event to trigger when the goal's duration expires. */
  on_celebration_end_event?: EntityActordefinitiontrigger | string | EventRef;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorChargeAttack = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** A charge attack cannot start if the entity is farther than this distance to the target.
   * @default 3 */
  max_distance?: number;
  /** A charge attack cannot start if the entity is closer than this distance to the target.
   * @default 2 */
  min_distance?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • vex: 4
   * @default 0 */
  priority?: number;
  /** Sound Event
   * @default "charge" */
  sound_event?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** Modifies the entity's speed when charging toward the target.
   * @default 1 */
  speed_multiplier?: number;
  /** Percent chance this entity will start a charge attack, if not already attacking (1.0 = 100%).
   * @default 0.1428000032901764 */
  success_rate?: number;
};
export type EntityMinecraftBehaviorChargeHeldItem = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The list of items that can be used to charge the held item. This list is required and must have at least one item in it. */
  items: string | ({
      [key: string]: string;
    });
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorCircleAroundAnchor = {
  /** Number of degrees to change this entity's facing by, when the entity selects its next anchor point.
   * @default 15 */
  angle_change?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Maximum distance from the anchor-point in which this entity considers itself to have reached the anchor point. This is to prevent the entity from bouncing back and forth trying to reach a specific spot.
  
  Sample values:
  • phantom: 1
   * @default 0.5 */
  goal_radius?: number;
  /** The number of blocks above the target that the next anchor point can be set. This value is used only when the entity is tracking a target.
  
  Sample values:
  • phantom: {"min":20,"max":40} */
  height_above_target_range?: number | [number, number] | Floatrange;
  /** Percent chance to determine how often to increase or decrease the current height around the anchor point. 1 = 100%. "height_change_chance" is deprecated and has been replaced with "height_adjustment_chance".
   * @default 0.0028570001013576984 */
  height_adjustment_chance?: number;
  /** Vertical distance from the anchor point this entity must stay within, upon a successful height adjustment.
  
  Sample values:
  • phantom: {"min":-4,"max":5} */
  height_offset_range?: number | [number, number] | Floatrange;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • phantom: 3
   * @default 0 */
  priority?: number;
  /** Percent chance to determine how often to increase the size of the current movement radius around the anchor point. 1 = 100%. "radius_change_chance" is deprecated and has been replaced with "radius_adjustment_chance".
   * @default 0.004000000189989805 */
  radius_adjustment_chance?: number;
  /** The number of blocks to increase the current movement radius by, upon successful "radius_adjustment_chance". If the current radius increases over the range maximum, the current radius will be set back to the range minimum and the entity will change between clockwise and counter-clockwise movement.
   * @default 1 */
  radius_change?: number;
  /** Horizontal distance from the anchor point this entity must stay within upon a successful radius adjustment. */
  radius_range?: number | [number, number] | Floatrange;
  /** Multiplies the speed at which this entity travels to its next desired position.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorControlledByPlayer = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The entity will attempt to rotate to face where the player is facing each tick. The entity will target this percentage of their difference in their current facing angles each tick (from 0.0 to 1.0 where 1.0 = 100%). This is limited by "fractional_rotation_limit". A value of 0.0 will result in the entity no longer turning to where the player is facing.
   * @default 0.5 */
  fractional_rotation?: number;
  /** Limits the total degrees the entity can rotate to face where the player is facing on each tick.
   * @default 5 */
  fractional_rotation_limit?: number;
  /** Speed multiplier of mount when controlled by player.
  
  Sample values:
  • strider: 1.45
   * @default 1 */
  mount_speed_multiplier?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorCroak = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Random range in seconds after which the croaking stops. Can also be a constant.
  
  Sample values:
  • frog: {"min":4.5,"max":4.5} */
  duration?: number | [number, number] | Floatrange;
  /** Conditions for the behavior to start and keep running. The interval between runs only starts after passing the filters.
  
  Sample values:
  • frog: {"all_of":[{"test":"in_water","value":false},{"... */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Random range in seconds between runs of this behavior. Can also be a constant.
  
  Sample values:
  • frog: {"min":10,"max":20} */
  interval?: number | [number, number] | Floatrange;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • frog: 9
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorDefendVillageTarget = {
  /** The percentage chance that the entity has to attack aggressors of its village, where 1.0 = 100%.
   * @default 0.05000000074505806 */
  attack_chance?: number;
  /** If true, this entity can attack its owner.
   * @default false */
  attack_owner?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Filters which types of targets are valid for this entity.
  
  Sample values:
  • iron_golem: [{"filters":{"AND":[{"OR":[{"test":"is_family",... */
  entity_types?: Array<Record<string, unknown>> | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** If true, this entity requires a path to the target.
  
  Sample values:
  • iron_golem: true
   * @default false */
  must_reach?: boolean;
  /** Determines if target-validity requires this entity to be in range only, or both in range and in sight.
   * @default false */
  must_see?: boolean;
  /** Time (in seconds) the target must not be seen by this entity to become invalid. Used only if "must_see" is true.
   * @default 3 */
  must_see_forget_duration?: number;
  /** Time (in seconds) this entity can continue attacking the target after the target is no longer valid.
   * @default 0 */
  persist_time?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • iron_golem: 1
   * @default 0 */
  priority?: number;
  /** Maximum distance this entity can be from the target when following it, otherwise the target becomes invalid. This value is only used if the entity doesn't declare "minecraft:follow_range".
   * @default 0 */
  within_radius?: number;
};
export type EntityMinecraftBehaviorDelayedAttack = {
  /** The entity's attack animation will play out over this duration (in seconds). Also controls attack cooldown.
   * @default 0.75 */
  attack_duration?: number;
  /** Allows the mob to perform this melee attack behavior only once during its lifetime.
   * @default false */
  attack_once?: boolean;
  /** Defines the entity types this entity will attack.
   * @default "" */
  attack_types?: string;
  /** Allows the mob, if on fire and empty handed, to ignite its target upon a successful attack.
   * @default false */
  can_spread_on_fire?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The percentage into the attack animation to apply the damage of the attack (1.0 = 100%).
   * @default 0.5 */
  hit_delay_pct?: number;
  /** Time, in seconds, added to the attack path recalculation interval when the target is beyond "path_inner_boundary".
   * @default 0.25 */
  inner_boundary_time_increase?: number;
  /** Maximum base time, in seconds, before recalculating a new attack path to the target (before increases are applied).
   * @default 0.550000011920929 */
  max_path_time?: number;
  /** Field of view, in degrees, used by the hard-coded sensing component to detect a valid attack target.
   * @default 90 */
  melee_fov?: number;
  /** Minimum base time, in seconds, before recalculating a new attack path to the target (before increases are applied).
   * @default 0.20000000298023224 */
  min_path_time?: number;
  /** Defines the event to trigger when this entity successfully attacks. */
  on_attack?: EntityActordefinitiontrigger;
  /** Defines the event to trigger when this entity kills the target. */
  on_kill?: EntityActordefinitiontrigger;
  /** Time, in seconds, added to the attack path recalculation interval when the target is beyond "path_outer_boundary".
   * @default 0.5 */
  outer_boundary_time_increase?: number;
  /** Time, in seconds, added to the attack path recalculation interval when the mob cannot move along the current path.
   * @default 0.75 */
  path_fail_time_increase?: number;
  /** Distance at which to increase attack path recalculation by "inner_boundary_time_increase".
   * @default 16 */
  path_inner_boundary?: number;
  /** Distance at which to increase attack path recalculation by "outer_boundary_time_increase".
   * @default 32 */
  path_outer_boundary?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Defines a 1-in-N chance for the mob to stop its current attack, where N equals "random_stop_interval".
   * @default 0 */
  random_stop_interval?: number;
  /** Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
   * @default 1.5 */
  reach_multiplier?: number;
  /** Specifies whether a full navigation path from the mob to the target is required.
   * @default false */
  require_complete_path?: boolean;
  /** Sound Event
   * @default "attack.strong" */
  sound_event?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** Multiplier applied to the mob's movement speed when moving toward its target.
   * @default 1 */
  speed_multiplier?: number;
  /** Allows the mob to track its target even if it lacks a hard-coded sensing component.
   * @default true */
  track_target?: boolean;
  /** Maximum rotation, in degrees, on the X-axis while the mob is trying to look at its target.
   * @default 30 */
  x_max_rotation?: number;
  /** Maximum rotation, in degrees, on the Y-axis while the mob is trying to look at its target.
   * @default 30 */
  y_max_head_rotation?: number;
};
export type EntityMinecraftBehaviorDig = {
  /** If true, this behavior can run when this entity is named. Otherwise not.
   * @default false */
  allow_dig_when_named?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Indicates that the actor should start digging when it sees daylight
   * @default false */
  digs_in_daylight?: boolean;
  /** Goal duration in seconds
  
  Sample values:
  • warden: 5.5
   * @default 0 */
  duration?: number;
  /** The minimum idle time in seconds between the last detected disturbance to the start of digging.
  
  Sample values:
  • warden: 60
   * @default 0 */
  idle_time?: number;
  /** Event(s) to run when the goal starts.
  
  Sample values:
  • warden: {"event":"on_digging_event"} */
  on_start?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • warden: 1
   * @default 0 */
  priority?: number;
  /** If true, finding new suspicious locations count as disturbances that may delay the start of this goal.
  
  Sample values:
  • warden: true
   * @default false */
  suspicion_is_disturbance?: boolean;
  /** If true, vibrations count as disturbances that may delay the start of this goal.
  
  Sample values:
  • warden: true
   * @default false */
  vibration_is_disturbance?: boolean;
};
export type EntityMinecraftBehaviorDragonchargeplayer = {
  /** The speed this entity moves when this behavior has started or while it's active.
   * @default 3 */
  active_speed?: number;
  /** If the dragon is outside the "target_zone" for longer than "continue_charge_threshold_time" seconds, the charge is canceled.
   * @default 0.5 */
  continue_charge_threshold_time?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The speed this entity moves while this behavior is not active.
   * @default 0.6000000238418579 */
  flight_speed?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • ender_dragon: 1
   * @default 0 */
  priority?: number;
  /** Minimum and maximum distance, from the target, this entity can use this behavior. */
  target_zone?: number | [number, number] | Floatrange;
  /** The speed at which this entity turns while using this behavior.
   * @default 0.699999988079071 */
  turn_speed?: number;
};
export type EntityMinecraftBehaviorDragonflaming = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time (in seconds) between each start of the cycle to roar, then breath flame.
   * @default 10 */
  cooldown_time?: number;
  /** Time (in seconds), after roar, to breath flame.
   * @default 0.5 */
  flame_time?: number;
  /** Number of ground flame-breath attacks to use before flight-takeoff.
   * @default 4 */
  ground_flame_count?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • ender_dragon: 1
   * @default 0 */
  priority?: number;
  /** Time (in seconds) to roar, before breathing flame.
   * @default 2 */
  roar_time?: number;
  /** Smoke Color
   * @default "#DC00EF" */
  smoke_color?: string;
  /** Smoke Radius
   * @default 5 */
  smoke_radius?: number;
  /** Smoke Time
   * @default 10 */
  smoke_time?: number;
};
export type EntityMinecraftBehaviorDragonstrafeplayer = {
  /** The speed this entity moves when this behavior has started or while it's active.
   * @default 0.6000000238418579 */
  active_speed?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Maximum distance of this entity's fireball attack while strafing.
   * @default 64 */
  fireball_range?: number;
  /** The speed this entity moves while this behavior is not active.
   * @default 0.6000000238418579 */
  flight_speed?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • ender_dragon: 2
   * @default 0 */
  priority?: number;
  /** Percent chance to to switch this entity's strafe direction between clockwise and counterclockwise. Switch direction chance occurs each time a new target is chosen (1.0 = 100%).
   * @default 0.125 */
  switch_direction_probability?: number;
  /** Time (in seconds) the target must be in fireball range, and in view [ie, no solid terrain in-between the target and this entity], before a fireball can be shot.
   * @default 0.25 */
  target_in_range_and_in_view_time?: number;
  /** Minimum and maximum distance, from the target, this entity can use this behavior. */
  target_zone?: number | [number, number] | Floatrange;
  /** The speed at which this entity turns while using this behavior.
   * @default 0.699999988079071 */
  turn_speed?: number;
  /** The target must be within "view_angle" degrees of the dragon's current rotation before a fireball can be shot.
   * @default 10 */
  view_angle?: number;
};
export type EntityMinecraftBehaviorDrinkMilk = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time (in seconds) that the goal is on cooldown before it can be used again.
   * @default 5 */
  cooldown_seconds?: number;
  /** Conditions that need to be met for the behavior to start. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorDropItemFor = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Total time that the goal is on cooldown before it can be used again.
   * @default 0.25 */
  cooldown?: number;
  /** The percent chance the entity will drop an item when using this goal.
   * @default 1 */
  drop_item_chance?: number;
  /** The list of conditions another entity must meet to be a valid target to drop an item for. */
  entity_types?: Array<Record<string, unknown>> | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
   * @default 0.5 */
  goal_radius?: number;
  /** The loot table that contains the possible loot the entity can drop with this goal.
   * @default "" */
  loot_table?: string;
  /** The maximum height the entities head will look at when dropping the item. The entity will always be looking at its target.
   * @default 10 */
  max_head_look_at_height?: number;
  /** If the target position is farther away than this distance on any tick, the entity will teleport to the target position.
   * @default 2 */
  minimum_teleport_distance?: number;
  /** The preferred distance the entity tries to be from the target it is dropping an item for.
   * @default 1 */
  offering_distance?: number;
  /** The event to trigger when the entity attempts to drop an item. */
  on_drop_attempt?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The number of randomly selected blocks each tick that the mob will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
   * @default 0 */
  search_count?: number;
  /** The height in blocks the entity will search within to find a valid target position.
   * @default 1 */
  search_height?: number;
  /** The distance in blocks the entity will search within to find a valid target position.
   * @default 0 */
  search_range?: number;
  /** The numbers of seconds that will pass before the dropped entity can be picked up from the ground.
   * @default 0 */
  seconds_before_pickup?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 1 */
  speed_multiplier?: number;
  /** The range in blocks within which the entity searches to find a target to drop an item for. */
  target_range?: number[] | ({
      /** X
       * @default 0 */
      x?: number;
      /** Y
       * @default 0 */
      y?: number;
      /** Z
       * @default 0 */
      z?: number;
    });
  /** When the entity teleports, offset the teleport position by this many blocks in the X, Y, and Z coordinate. */
  teleport_offset?: number[] | ({
      /** X
       * @default 0 */
      x?: number;
      /** Y
       * @default 0 */
      y?: number;
      /** Z
       * @default 0 */
      z?: number;
    });
  /** The valid times of day that this goal can be used. For reference: noon is 0.0, sunset is 0.25, midnight is 0.5, and sunrise is 0.75, and back to noon for 1.0. */
  time_of_day_range?: number | [number, number] | Floatrange;
};
export type EntityMinecraftBehaviorEatBlock = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** A collection of pairs of blocks; the first ("eat_block") is the block the entity should eat, the second ("replace_block") is the block that should replace the eaten block.
  
  Sample values:
  • sheep: [{"eat_block":"grass","replace_block":"dirt"},{... */
  eat_and_replace_block_pairs?: EntityEatandreplaceblockpair[];
  /** The event to trigger when the block eating animation has completed.
  
  Sample values:
  • sheep: {"event":"minecraft:on_eat_block","target":"self"} */
  on_eat?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • sheep: 6
   * @default 0 */
  priority?: number;
  /** A molang expression defining the success chance the entity has to consume a block.
  
  Sample values:
  • sheep: query.is_baby ? 0.02 : 0.001 */
  success_chance?: ({
      [key: string]: string;
    }) | string | ({
      [key: string]: unknown;
    }) | number;
  /** The amount of time (in seconds) it takes for the block to be eaten upon a successful eat attempt.
  
  Sample values:
  • sheep: 1.8
   * @default 1.7999999523162842 */
  time_until_eat?: number;
};
export type EntityEatandreplaceblockpair = {
  /** The block the entity should eat.
   * @default "" */
  eat_block?: string;
  /** The block that should replace the eaten block.
   * @default "" */
  replace_block?: string;
};
export type EntityMinecraftBehaviorEatMob = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Sets the time in seconds the eat animation should play for.
  
  Sample values:
  • frog: 0.3
   * @default 1 */
  eat_animation_time?: number;
  /** Sets the sound that should play when eating a mob.
  
  Sample values:
  • frog: tongue
   * @default "" */
  eat_mob_sound?: string;
  /** The loot table for loot to be dropped when eating a mob.
  
  Sample values:
  • frog: loot_tables/entities/frog.json
   * @default "" */
  loot_table?: string;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • frog: 7
   * @default 0 */
  priority?: number;
  /** Sets the force which the mob-to-be-eaten is pulled towards the eating mob.
  
  Sample values:
  • frog: 0.75
   * @default 1 */
  pull_in_force?: number;
  /** Sets the desired distance to be reached before eating the mob.
  
  Sample values:
  • frog: 1.75
   * @default 1 */
  reach_mob_distance?: number;
  /** Sets the entity's speed when running toward the target.
  
  Sample values:
  • frog: 2
   * @default 1 */
  run_speed?: number;
};
export type EntityMinecraftBehaviorEmerge = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time in seconds the mob has to wait before using the goal again
   * @default 0.5 */
  cooldown_time?: number;
  /** Goal duration in seconds
  
  Sample values:
  • warden: 7
   * @default 5 */
  duration?: number;
  /** Trigger to be executed when the goal execution is about to end
  
  Sample values:
  • warden: {"event":"minecraft:emerged","target":"self"} */
  on_done?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorEquipItem = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • bogged: 3
  • parched: 4
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorExploreOutskirts = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The distance from the boundary the villager must be within in to explore the outskirts. */
  dist_from_boundary?: number[] | ({
      /** X
       * @default 0 */
      x?: number;
      /** Y
       * @default 0 */
      y?: number;
      /** Z
       * @default 0 */
      z?: number;
    });
  /** Total distance in blocks the the entity will explore beyond the village bounds when choosing its travel point.
   * @default 5 */
  explore_dist?: number;
  /** This is the maximum amount of time an entity will attempt to reach it's travel point on the outskirts of the village before the goal exits.
   * @default 60 */
  max_travel_time?: number;
  /** The wait time in seconds between choosing new explore points will be chosen on a random interval between this value and the minimum wait time. This value is also the total amount of time the entity will explore random points before the goal stops.
   * @default 0 */
  max_wait_time?: number;
  /** The entity must be within this distance for it to consider it has successfully reached its target.
   * @default 2.25 */
  min_dist_from_target?: number;
  /** The minimum perimeter of the village required to run this goal.
   * @default 1 */
  min_perimeter?: number;
  /** The wait time in seconds between choosing new explore points will be chosen on a random interval between this value and the maximum wait time.
   * @default 3 */
  min_wait_time?: number;
  /** A new explore point will randomly be chosen within this XZ distance of the current target position when navigation has finished and the wait timer has elapsed.
   * @default 5 */
  next_xz?: number;
  /** A new explore point will randomly be chosen within this Y distance of the current target position when navigation has finished and the wait timer has elapsed.
   * @default 3 */
  next_y?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The multiplier for speed while using this goal. 1.0 maintains the speed.
   * @default 1 */
  speed_multiplier?: number;
  /** Each new explore point will be chosen on a random interval between the minimum and the maximum wait time, divided by this value. This does not apply to the first explore point chosen when the goal runs.
   * @default 2 */
  timer_ratio?: number;
};
export type EntityMinecraftBehaviorFertilizeFarmBlock = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Distance in blocks within the mob considers it has reached it's target position.
   * @default 1.5 */
  goal_radius?: number;
  /** The maximum number of times the mob will use fertilzer on the target block.
   * @default 1 */
  max_fertilizer_usage?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The maximum amount of time in seconds that the goal can take before searching again. The time is chosen between 0 and this number.
   * @default 8 */
  search_cooldown_max_seconds?: number;
  /** The number of randomly selected blocks each tick that the mob will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
   * @default 9 */
  search_count?: number;
  /** The height in blocks the mob will search within to find a valid target position.
   * @default 1 */
  search_height?: number;
  /** The distance in blocks the mob will search within to find a valid target position.
   * @default 1 */
  search_range?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 0.5 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorFireAtTarget = {
  /** The cooldown time in seconds before this goal can be used again.
  
  Sample values:
  • breeze: 0.5
   * @default 0.5 */
  attack_cooldown?: number;
  /** Target needs to be within this range for the attack to happen.
  
  Sample values:
  • breeze: {"min":0,"max":16} */
  attack_range?: number | [number, number] | Floatrange;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Conditions that need to be met for the behavior to start.
  
  Sample values:
  • breeze: {"all_of":[{"test":"is_navigating","value":fals... */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Maximum head rotation (in degrees), on the X-axis, that this entity can apply while trying to look at the target.
   * @default 30 */
  max_head_rotation_x?: number;
  /** Maximum head rotation (in degrees), on the Y-axis, that this entity can apply while trying to look at the target.
   * @default 30 */
  max_head_rotation_y?: number;
  /** Entity anchor for the projectile spawn location.
  
  Sample values:
  • breeze: 2
   * @default 2 */
  owner_anchor?: number;
  /** Offset vector from the owner_anchor.
  
  Sample values:
  • breeze: [0,0.3,0] */
  owner_offset?: number[] | ({
      /** X
       * @default 0 */
      x?: number;
      /** Y
       * @default 0 */
      y?: number;
      /** Z
       * @default 0 */
      z?: number;
    });
  /** Time in seconds between firing the projectile and ending the goal.
  
  Sample values:
  • breeze: 0.2
   * @default 0.20000000298023224 */
  post_shoot_delay?: number;
  /** Time in seconds before firing the projectile.
  
  Sample values:
  • breeze: 0.75
   * @default 0.75 */
  pre_shoot_delay?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • breeze: 2
   * @default 0 */
  priority?: number;
  /** Actor definition to use as projectile for the ranged attack. The actor must be a projectile. This field is required for the goal to be usable.
  
  Sample values:
  • breeze: minecraft:breeze_wind_charge_projectile
   * @default "" */
  projectile_def?: string;
  /** Field of view (in degrees) when using sensing to detect a target for attack.
  
  Sample values:
  • breeze: 90
   * @default 90 */
  ranged_fov?: number;
  /** Entity anchor for projectile target.
   * @default 2 */
  target_anchor?: number;
  /** Offset vector from the target_anchor.
  
  Sample values:
  • breeze: [0,0.5,0] */
  target_offset?: number[] | ({
      /** X
       * @default 0 */
      x?: number;
      /** Y
       * @default 0 */
      y?: number;
      /** Z
       * @default 0 */
      z?: number;
    });
};
export type EntityMinecraftBehaviorFollowTargetLeader = {
  /** If true, the mob will always search for a valid leader to follow if none is found or current leader is not valid anymore
   * @default false */
  always_look_for_leader?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Defines the distance in blocks the mob will stay from its target while following.
   * @default 0 */
  follow_distance?: number;
  /** The filters to use when determining if a mob is a suitable leader or not. */
  leader_filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Number of ticks that must pass before a new search is initiated after a target is not found, lost, or becomes invalid.
   * @default 20 */
  search_cooldown?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
   * @default 1 */
  speed_multiplier?: number;
  /** Defines the maximum distance in blocks a mob can get from its target leader before giving up trying to follow it.
   * @default 0 */
  within_radius?: number;
};
export type EntityMinecraftBehaviorGoAndGiveItemsToNoteblock = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Sets the time an entity should continue delivering items to a noteblock after hearing it.
   * @default 30 */
  listen_time?: number;
  /** Event(s) to run when this mob throws items.
  
  Sample values:
  • allay: [{"event":"pickup_item_delay","target":"self"}] */
  on_item_throw?: EntityActordefinitiontrigger[];
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • allay: 3
   * @default 0 */
  priority?: number;
  /** Sets the desired distance to be reached before throwing the items towards the block.
   * @default 3 */
  reach_block_distance?: number;
  /** Sets the entity's speed when running toward the block.
  
  Sample values:
  • allay: 8
   * @default 1 */
  run_speed?: number;
  /** Sets the throw force.
   * @default 0.20000000298023224 */
  throw_force?: number;
  /** Sound to play when this mob throws an item.
  
  Sample values:
  • allay: item_thrown
   * @default "charge" */
  throw_sound?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** Sets the vertical throw multiplier that is applied on top of the throw force in the vertical direction.
   * @default 1.5 */
  vertical_throw_mul?: number;
};
export type EntityMinecraftBehaviorGoAndGiveItemsToOwner = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Event(s) to run when this mob throws items.
  
  Sample values:
  • allay: [{"event":"pickup_item_delay","target":"self"}] */
  on_item_throw?: EntityActordefinitiontrigger[];
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • allay: 4
   * @default 0 */
  priority?: number;
  /** Sets the desired distance to be reached before giving items to owner.
   * @default 3 */
  reach_mob_distance?: number;
  /** Sets the entity's speed when running toward the owner.
  
  Sample values:
  • allay: 8
   * @default 1 */
  run_speed?: number;
  /** Sets the throw force.
   * @default 0.20000000298023224 */
  throw_force?: number;
  /** Sound to play when this mob throws an item.
  
  Sample values:
  • allay: item_thrown
   * @default "charge" */
  throw_sound?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** Sets the vertical throw multiplier that is applied on top of the throw force in the vertical direction.
   * @default 1.5 */
  vertical_throw_mul?: number;
};
export type EntityMinecraftBehaviorGoHome = {
  /** Distance in blocks that the mob is considered close enough to the end of the current path. A new path will then be calculated to continue toward home.
   * @default 2 */
  calculate_new_path_radius?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot.
   * @default 0.5 */
  goal_radius?: number;
  /** A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal.
   * @default 120 */
  interval?: number;
  /** Event(s) to run when this goal fails. */
  on_failed?: EntityActordefinitiontrigger[];
  /** Event(s) to run when this mob gets home. */
  on_home?: EntityActordefinitiontrigger[];
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorGuardianAttack = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Amount of additional damage dealt from an elder guardian's magic attack.
   * @default 2 */
  elder_extra_magic_damage?: number;
  /** In hard difficulty, amount of additional damage dealt from a guardian's magic attack.
   * @default 2 */
  hard_mode_extra_magic_damage?: number;
  /** Amount of damage dealt from a guardian's magic attack. Magic attack damage is added to the guardian's base attack damage.
   * @default 1 */
  magic_damage?: number;
  /** Guardian attack behavior stops if the target is closer than this distance (doesn't apply to elders).
   * @default 3 */
  min_distance?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • elder_guardian: 4
   * @default 0 */
  priority?: number;
  /** Time (in seconds) to wait after starting an attack before playing the guardian attack sound.
   * @default 0.5 */
  sound_delay_time?: number;
  /** Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
   * @default 90 */
  x_max_rotation?: number;
  /** Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
   * @default 90 */
  y_max_head_rotation?: number;
};
export type EntityMinecraftBehaviorHarvestFarmBlock = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Distance in blocks within the entity considers it has reached it's target position.
   * @default 1.5 */
  goal_radius?: number;
  /** The maximum amount of time in seconds that the goal can take before searching for the first harvest block. The time is chosen between 0 and this number.
   * @default 1 */
  max_seconds_before_search?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The maximum amount of time in seconds that the goal can take before searching again, after failing to find a a harvest block already. The time is chosen between 0 and this number.
   * @default 8 */
  search_cooldown_max_seconds?: number;
  /** The number of randomly selected blocks each tick that the mob will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
   * @default 0 */
  search_count?: number;
  /** The height in blocks the entity will search within to find a valid target position.
   * @default 1 */
  search_height?: number;
  /** The distance in blocks the entity will search within to find a valid target position.
   * @default 16 */
  search_range?: number;
  /** The amount of time in seconds that the goal will cooldown after a successful reap/sow, before it can start again.
   * @default 0.5 */
  seconds_until_new_task?: number;
  /** Movement speed multiplier of the mob when using this goal.
   * @default 0.5 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorInvestigateSuspiciousLocation = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Distance in blocks within the entity considers it has reached it's target position.
   * @default 1.5 */
  goal_radius?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • warden: 5
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier
  
  Sample values:
  • warden: 0.7
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorJumpAroundTarget = {
  /** Enables collision checks when calculating the jump. Setting check_collision to true may affect performance and should be used with care.
   * @default false */
  check_collision?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Scaling temporarily applied to the entity's AABB bounds when jumping. A smaller bounding box reduces the risk of collisions during the jump. When check_collision is true it also increases the chance of being able to jump when close to obstacles.
  
  Sample values:
  • breeze: 0.7
   * @default 0.699999988079071 */
  entity_bounding_box_scale?: number;
  /** Conditions that need to be met for the behavior to start.
  
  Sample values:
  • breeze: {"all_of":[{"any_of":[{"test":"in_water","value... */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The jump angles in float degrees that are allowed when performing the jump. The order in which the angles are chosen is randomized.
  
  Sample values:
  • breeze: [40,55,60,75,80] */
  jump_angles?: number[];
  /** The time in seconds to spend in cooldown before this goal can be used again.
  
  Sample values:
  • breeze: 0.5
   * @default 0.5 */
  jump_cooldown_duration?: number;
  /** The time in seconds to spend in cooldown after being hurt before this goal can be used again.
  
  Sample values:
  • breeze: 0.1
   * @default 0.10000000149011612 */
  jump_cooldown_when_hurt_duration?: number;
  /** The range deciding how close to and how far away from the target the landing position can be when jumping.
  
  Sample values:
  • breeze: {"min":4,"max":8} */
  landing_distance_from_target?: number | [number, number] | Floatrange;
  /** This angle (in degrees) is used for controlling the spread when picking a landing position behind the target. A zero spread angle means the landing position will be straight behind the target with no variance. A 90 degree spread angle means the landing position can be up to 45 degrees to the left and to the right of the position straight behind the target's view direction.
  
  Sample values:
  • breeze: 90
   * @default 90 */
  landing_position_spread_degrees?: number;
  /** If the entity was hurt within these last seconds, the jump_cooldown_when_hurt_duration will be used instead of jump_cooldown_duration.
  
  Sample values:
  • breeze: 2
   * @default 2 */
  last_hurt_duration?: number;
  /** If the entity's line of sight towards its target is obstructed by an obstacle with a height below this number, the obstacle will be ignored, and the goal will try to find a valid landing position.
  
  Sample values:
  • breeze: 4
   * @default 4 */
  line_of_sight_obstruction_height_ignore?: number;
  /** Maximum velocity a jump can be performed at.
  
  Sample values:
  • breeze: 1.4
   * @default 1.399999976158142 */
  max_jump_velocity?: number;
  /** The time in seconds to spend preparing for the jump.
  
  Sample values:
  • breeze: 0.5
   * @default 0.5 */
  prepare_jump_duration?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • breeze: 5
   * @default 0 */
  priority?: number;
  /** The number of blocks above the entity's head that has to be air for this goal to be usable.
  
  Sample values:
  • breeze: 4
   * @default 4 */
  required_vertical_space?: number;
  /** The number of blocks above and below from the jump target position that will be checked to find a surface to land on.
  
  Sample values:
  • breeze: 10
   * @default 10 */
  snap_to_surface_block_range?: number;
  /** Target needs to be within this range for the jump to happen.
  
  Sample values:
  • breeze: {"min":4,"max":20} */
  valid_distance_to_target?: number | [number, number] | Floatrange;
};
export type EntityMinecraftBehaviorJumpToBlock = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Minimum and maximum cooldown time-range (positive, in seconds) between each attempted jump.
  
  Sample values:
  • frog: {"min":5,"max":7}
  • goat: [30,60] */
  cooldown_range?: number | [number, number] | Floatrange;
  /** Blocks that the mob can't jump to.
  
  Sample values:
  • frog: [{"name":"minecraft:water"}] */
  forbidden_blocks?: string | ({
      [key: string]: string;
    });
  /** The maximum velocity with which the mob can jump.
  
  Sample values:
  • frog: 1
   * @default 1.5 */
  max_velocity?: number;
  /** The minimum distance (in blocks) from the mob to a block, in order to consider jumping to it.
  
  Sample values:
  • frog: 1
   * @default 2 */
  minimum_distance?: number;
  /** The minimum length (in blocks) of the mobs path to a block, in order to consider jumping to it.
  
  Sample values:
  • frog: 2
  • goat: 8
   * @default 5 */
  minimum_path_length?: number;
  /** Blocks that the mob prefers jumping to.
  
  Sample values:
  • frog: [{"name":"minecraft:waterlily"},{"name":"minecr... */
  preferred_blocks?: string | ({
      [key: string]: string;
    });
  /** Chance (between 0.0 and 1.0) that the mob will jump to a preferred block, if in range. Only matters if preferred blocks are defined.
  
  Sample values:
  • frog: 0.5
   * @default 1 */
  preferred_blocks_chance?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • frog: 10
  • goat: 8
   * @default 0 */
  priority?: number;
  /** The scalefactor of the bounding box of the mob while it is jumping.
  
  Sample values:
  • frog: 0.6
   * @default 0.699999988079071 */
  scale_factor?: number;
  /** The height (in blocks, in range [1, 15]) of the search box, centered around the mob.
  
  Sample values:
  • frog: 4
  • goat: 10
   * @default 10 */
  search_height?: number;
  /** The width (in blocks, in range [1, 15]) of the search box, centered around the mob.
  
  Sample values:
  • frog: 8
  • goat: 10
   * @default 8 */
  search_width?: number;
};
export type EntityMinecraftBehaviorKnockbackRoar = {
  /** Event that is triggered when the roar ends. Can be an object with event and target properties, or a simple event string. */
  on_roar_end?: EntityActordefinitiontrigger | string;
  /** The delay after which the knockback occurs (in seconds).
   * @default 0.5 */
  attack_time?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time (in seconds) the mob has to wait before using the goal again.
   * @default 0.10000000149011612 */
  cooldown_time?: number;
  /** The list of conditions another entity must meet to be a valid target to apply damage to. */
  damage_filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The max duration of the roar (in seconds).
   * @default 1 */
  duration?: number;
  /** The damage dealt by the knockback roar.
   * @default 6 */
  knockback_damage?: number;
  /** The list of conditions another entity must meet to be a valid target to apply knockback to. */
  knockback_filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The maximum height for vertical knockback.
   * @default 0.4000000059604645 */
  knockback_height_cap?: number;
  /** The strength of the horizontal knockback.
   * @default 4 */
  knockback_horizontal_strength?: number;
  /** The radius (in blocks) of the knockback effect.
   * @default 4 */
  knockback_range?: number;
  /** The strength of the vertical knockback.
   * @default 4 */
  knockback_vertical_strength?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorMeleeAttack = {
  /** Defines the entity types this entity will attack.
   * @default "" */
  attack_types?: string;
  /** Allows the mob to perform this melee attack behavior only once during its lifetime.
   * @default false */
  attack_once?: boolean;
  /** Allows the mob, if on fire and empty handed, to ignite its target upon a successful attack.
   * @default false */
  can_spread_on_fire?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Cooldown time, in seconds, between consecutive attacks.
   * @default 1 */
  cooldown_time?: number;
  /** Time, in seconds, added to the attack path recalculation interval when the target is beyond "path_inner_boundary".
   * @default 0.25 */
  inner_boundary_time_increase?: number;
  /** Maximum base time, in seconds, before recalculating a new attack path to the target (before increases are applied).
   * @default 0.550000011920929 */
  max_path_time?: number;
  /** Field of view, in degrees, used by the hard-coded sensing component to detect a valid attack target.
   * @default 90 */
  melee_fov?: number;
  /** Minimum base time, in seconds, before recalculating a new attack path to the target (before increases are applied).
   * @default 0.20000000298023224 */
  min_path_time?: number;
  /** Defines the event to trigger when this entity successfully attacks. */
  on_attack?: EntityActordefinitiontrigger;
  /** Defines the event to trigger when this entity kills the target. */
  on_kill?: EntityActordefinitiontrigger;
  /** Time, in seconds, added to the attack path recalculation interval when the target is beyond "path_outer_boundary".
   * @default 0.5 */
  outer_boundary_time_increase?: number;
  /** Time, in seconds, added to the attack path recalculation interval when the mob cannot move along the current path.
   * @default 0.75 */
  path_fail_time_increase?: number;
  /** Distance at which to increase attack path recalculation by "inner_boundary_time_increase".
   * @default 16 */
  path_inner_boundary?: number;
  /** Distance at which to increase attack path recalculation by "outer_boundary_time_increase".
   * @default 32 */
  path_outer_boundary?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Defines a 1-in-N chance for the mob to stop its current attack, where N equals "random_stop_interval".
   * @default 0 */
  random_stop_interval?: number;
  /** Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
   * @default 2 */
  reach_multiplier?: number;
  /** Specifies whether a full navigation path from the mob to the target is required.
   * @default false */
  require_complete_path?: boolean;
  /** Multiplier applied to the mob's movement speed when moving toward its target.
   * @default 1 */
  speed_multiplier?: number;
  /** Allows the mob to track its target even if it lacks a hard-coded sensing component.
   * @default false */
  track_target?: boolean;
  /** Maximum rotation, in degrees, on the X-axis while the mob is trying to look at its target.
   * @default 30 */
  x_max_rotation?: number;
  /** Maximum rotation, in degrees, on the Y-axis while the mob is trying to look at its target.
   * @default 30 */
  y_max_head_rotation?: number;
};
export type EntityMinecraftBehaviorMeleeBoxAttack = {
  /** Allows the mob to perform this melee attack behavior only once during its lifetime.
   * @default false */
  attack_once?: boolean;
  /** Defines the entity types this entity will attack.
   * @default "" */
  attack_types?: string;
  /** Allows the mob, if on fire and empty handed, to ignite its target upon a successful attack.
  
  Sample values:
  • drowned: true
   * @default false */
  can_spread_on_fire?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Cooldown time, in seconds, between consecutive attacks.
   * @default 1 */
  cooldown_time?: number;
  /** The attack reach of the mob will be a box with the size of the mobs bounds increased by this value in all horizontal directions.
   * @default 0.800000011920929 */
  horizontal_reach?: number;
  /** Time, in seconds, added to the attack path recalculation interval when the target is beyond "path_inner_boundary".
   * @default 0.25 */
  inner_boundary_time_increase?: number;
  /** Maximum base time, in seconds, before recalculating a new attack path to the target (before increases are applied).
   * @default 0.550000011920929 */
  max_path_time?: number;
  /** Field of view, in degrees, used by the hard-coded sensing component to detect a valid attack target.
   * @default 90 */
  melee_fov?: number;
  /** Minimum base time, in seconds, before recalculating a new attack path to the target (before increases are applied).
   * @default 0.20000000298023224 */
  min_path_time?: number;
  /** Defines the event to trigger when this entity successfully attacks. */
  on_attack?: EntityActordefinitiontrigger;
  /** Defines the event to trigger when this entity kills the target. */
  on_kill?: EntityActordefinitiontrigger;
  /** Time, in seconds, added to the attack path recalculation interval when the target is beyond "path_outer_boundary".
   * @default 0.5 */
  outer_boundary_time_increase?: number;
  /** Time, in seconds, added to the attack path recalculation interval when the mob cannot move along the current path.
   * @default 0.75 */
  path_fail_time_increase?: number;
  /** Distance at which to increase attack path recalculation by "inner_boundary_time_increase".
   * @default 16 */
  path_inner_boundary?: number;
  /** Distance at which to increase attack path recalculation by "outer_boundary_time_increase".
   * @default 32 */
  path_outer_boundary?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • blaze: 3
  • bogged: 4
  • dolphin: 2
   * @default 0 */
  priority?: number;
  /** Defines a 1-in-N chance for the mob to stop its current attack, where N equals "random_stop_interval".
  
  Sample values:
  • cave_spider: 100
   * @default 0 */
  random_stop_interval?: number;
  /** Specifies whether a full navigation path from the mob to the target is required.
  
  Sample values:
  • drowned: true
   * @default false */
  require_complete_path?: boolean;
  /** Multiplier applied to the mob's movement speed when moving toward its target.
  
  Sample values:
  • bogged: 1.25
   * @default 1 */
  speed_multiplier?: number;
  /** Allows the mob to track its target even if it lacks a hard-coded sensing component.
  
  Sample values:
  • bogged: true
   * @default false */
  track_target?: boolean;
  /** Maximum rotation, in degrees, on the X-axis while the mob is trying to look at its target.
   * @default 30 */
  x_max_rotation?: number;
  /** Maximum rotation, in degrees, on the Y-axis while the mob is trying to look at its target.
   * @default 30 */
  y_max_head_rotation?: number;
};
export type EntityMinecraftBehaviorMoveAroundTarget = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** This angle (in degrees) is used for controlling the spread when picking a destination position behind the target. A zero spread angle means the destination position will be straight behind the target with no variance. A 90 degree spread angle means the destination position can be up to 45 degrees to the left and to the right of the position straight behind the target's view direction.
  
  Sample values:
  • breeze: 360
   * @default 90 */
  destination_pos_spread_degrees?: number;
  /** The range of distances from the target entity within which the goal should look for a position to move the owner entity to.
  
  Sample values:
  • breeze: {"min":4,"max":8} */
  destination_position_range?: number | [number, number] | Floatrange;
  /** Conditions that need to be met for the behavior to start.
  
  Sample values:
  • breeze: {"all_of":[{"test":"on_ground","value":true},{"... */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Distance in height (in blocks) between the owner entity and the target has to be less than this value when owner checks if it is too close and should move away from the target. This value needs to be bigger than zero for the move away logic to trigger.
   * @default 10 */
  height_difference_limit?: number;
  /** Horizontal search distance (in blocks) when searching for a position to move away from target.
   * @default 5 */
  horizontal_search_distance?: number;
  /** The speed with which the entity should move to its target position.
  
  Sample values:
  • breeze: 1.2
   * @default 0.6000000238418579 */
  movement_speed?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • breeze: 3
   * @default 0 */
  priority?: number;
  /** Vertical search distance (in blocks) when searching for a position to move away from target.
   * @default 5 */
  vertical_search_distance?: number;
};
export type EntityMinecraftBehaviorMoveIndoors = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The movement speed modifier to apply to the entity while it is moving indoors.
   * @default 0.800000011920929 */
  speed_multiplier?: number;
  /** The cooldown time in seconds before the goal can be reused after pathfinding fails
   * @default 8 */
  timeout_cooldown?: number;
};
export type EntityMinecraftBehaviorMoveOutdoors = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The radius away from the target block to count as reaching the goal
   * @default 2 */
  goal_radius?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The amount of times to try finding a random outdoors position before failing
   * @default 10 */
  search_count?: number;
  /** The y range to search for an outdoors position for
   * @default 5 */
  search_height?: number;
  /** The x and z range to search for an outdoors position for
   * @default 15 */
  search_range?: number;
  /** The movement speed modifier to apply to the entity while it is moving outdoors
   * @default 0.5 */
  speed_multiplier?: number;
  /** The cooldown time in seconds before the goal can be reused after pathfinding fails
   * @default 8 */
  timeout_cooldown?: number;
};
export type EntityMinecraftBehaviorMoveTowardsDwellingRestriction = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • iron_golem: 4
   * @default 0 */
  priority?: number;
  /** This multiplier modifies the entity's speed when moving towards its restriction.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorMoveTowardsHomeRestriction = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • elder_guardian: 5
   * @default 0 */
  priority?: number;
  /** This multiplier modifies the entity's speed when moving towards its restriction.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorOcelotattack = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Time (in seconds) between attacks.
   * @default 1 */
  cooldown_time?: number;
  /** Max distance from the target, this entity will use this attack behavior.
   * @default 15 */
  max_distance?: number;
  /** Max distance from the target, this entity starts sneaking.
   * @default 15 */
  max_sneak_range?: number;
  /** Max distance from the target, this entity starts sprinting (sprinting takes priority over sneaking).
   * @default 4 */
  max_sprint_range?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
   * @default 2 */
  reach_multiplier?: number;
  /** Modifies the attacking entity's movement speed while sneaking.
   * @default 0.6000000238418579 */
  sneak_speed_multiplier?: number;
  /** Modifies the attacking entity's movement speed while sprinting.
   * @default 1.3300000429153442 */
  sprint_speed_multiplier?: number;
  /** Modifies the attacking entity's movement speed when not sneaking or sprinting, but still within attack range.
   * @default 0.800000011920929 */
  walk_speed_multiplier?: number;
  /** Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
   * @default 30 */
  x_max_rotation?: number;
  /** Maximum rotation (in degrees), on the Y-axis, this entity's head can rotate while trying to look at the target.
   * @default 30 */
  y_max_head_rotation?: number;
};
export type EntityMinecraftBehaviorOfferFlower = {
  /** Percent chance that the mob will start this goal from 0.0 to 1.0 (where 1.0 = 100%).
   * @default 0.0001250000059371814 */
  chance_to_start?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Conditions that need to be met for the behavior to start.
  
  Sample values:
  • iron_golem: {"test":"is_daytime"} */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
   * @default 30 */
  max_head_rotation_y?: number;
  /** The max amount of time (in seconds) that the mob will offer the flower for before exiting the Goal.
   * @default 20 */
  max_offer_flower_duration?: number;
  /** Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
   * @default 30 */
  max_rotation_x?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • iron_golem: 5
   * @default 0 */
  priority?: number;
  /** The dimensions of the AABB used to search for a potential mob to offer flower to. */
  search_area?: number[] | ({
      /** X
       * @default 0 */
      x?: number;
      /** Y
       * @default 0 */
      y?: number;
      /** Z
       * @default 0 */
      z?: number;
    });
};
export type EntityMinecraftBehaviorPlaceBlock = {
  /** If true, whether the goal is affected by the mob griefing game rule.
   * @default true */
  affected_by_griefing_rule?: boolean;
  /** Filters for if the entity should try to place its block. Self and Target are set. */
  can_place?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Chance each tick for the entity to try and place a block.
   * @default 1 */
  chance?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Trigger ran if the entity does place its block. Self, Target, and Block are set. */
  on_place?: EntityActordefinitiontrigger;
  /** Block descriptors for which blocks are valid to be placed from the entity's carried item, if empty all blocks are valid. */
  placeable_carried_blocks?: (Array<{
      /** Name
       * @default "" */
      name?: string;
      /** States */
      states?: number | string | boolean;
      /** Tags
       * @default "" */
      tags?: string;
    }>) | string | Record<string, unknown>;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Weighted block descriptors for which blocks should be randomly placed, if empty the entity will try to place its carried block from placeable_carried_blocks. */
  randomly_placeable_blocks?: EntityPlaceblockgoalweightedblockdescriptor[];
  /** XZ range from which the entity will try and place blocks in. */
  xz_range?: number | [number, number] | Intrange;
  /** Y range from which the entity will try and place blocks in. */
  y_range?: number | [number, number] | Intrange;
};
export type EntityPlaceblockgoalweightedblockdescriptor = {
  /** Block descriptor for this entry. */
  block?: ({
      /** Name
       * @default "" */
      name?: string;
      /** States */
      states?: number | string | boolean;
      /** Tags
       * @default "" */
      tags?: string;
    }) | string | Record<string, unknown>;
  /** Filter for if this entry should be randomly selected from. Self, Target, and Block are set. */
  filter?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Weight for this entry.
   * @default 1 */
  weight?: number;
};
export type EntityMinecraftBehaviorPlay = {
  /** Percent chance that the mob will start this goal, from 0 to 1.
   * @default 0.0024999999441206455 */
  chance_to_start?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The distance (in blocks) that the mob tries to be in range of the friend it's following.
   * @default 2 */
  follow_distance?: number;
  /** The dimensions of the AABB used to search for a potential friend to play with. */
  friend_search_area?: number[] | ({
      /** X
       * @default 0 */
      x?: number;
      /** Y
       * @default 0 */
      y?: number;
      /** Z
       * @default 0 */
      z?: number;
    });
  /** The entity type(s) to consider when searching for a potential friend to play with. */
  friend_types?: Array<Record<string, unknown>> | ({
      /** If true, the mob will check if its outnumbered
       * @default false */
      check_if_outnumbered?: boolean;
      /** The amount of time in seconds that the mob has to wait before selecting a target of the same type again
       * @default 0 */
      cooldown?: number;
      /** Conditions that make this entry in the list valid */
      filters?: ({
          /** The domain the test should be performed in. */
          domain?: Record<string, unknown>;
          /** The comparison to apply with 'value'. */
          operator?: Record<string, unknown>;
          /** The subject of this filter test. */
          subject?: Record<string, unknown>;
          /** The name of the test to apply. */
          test?: string;
          /** The value being compared with the test. */
          value?: Record<string, unknown>;
        }) | Record<string, unknown>;
      /** Maximum distance this mob can be away to be a valid choice
       * @default 16 */
      max_dist?: number;
      /** Maximum distance this mob can be from the target to stop fleeing
       * @default 10 */
      max_flee?: number;
      /** Maximum height this mob can be away to be a valid choice
       * @default -1 */
      max_height?: number;
      /** If true, the mob has to be visible to be a valid choice */
      must_see?: boolean;
      /** Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more
       * @default 3 */
      must_see_forget_duration?: number;
      /** Priority for this mob type
       * @default 0 */
      priority?: number;
      /** If true, the mob will stop being targeted if it stops meeting any conditions.
       * @default false */
      reevaluate_description?: boolean;
      /** Multiplier for the sprinting speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      sprint_speed_multiplier?: number;
      /** Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
       * @default 1 */
      walk_speed_multiplier?: number;
    });
  /** The max amount of seconds that the mob will play for before exiting the Goal.
   * @default 50 */
  max_play_duration_seconds?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The height (in blocks) that the mob will search within to find a random position position to move to. Must be at least 1.
   * @default 3 */
  random_pos_search_height?: number;
  /** The distance (in blocks) on ground that the mob will search within to find a random position to move to. Must be at least 1.
   * @default 16 */
  random_pos_search_range?: number;
  /** Movement speed multiplier of the mob when using this AI Goal.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorPlayDead = {
  /** Whether the mob will receive the regeneration effect while playing dead.
   * @default false */
  apply_regeneration?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The list of Entity Damage Sources that will cause this mob to play dead. */
  damage_sources?: Array<"all" | "anvil" | "block_explosion" | "campfire" | "charging" | "contact" | "drowning" | "entity_attack" | "entity_explosion" | "fall" | "falling_block" | "fire" | "fire_tick" | "fireworks" | "fly_into_wall" | "freezing" | "lava" | "lightning" | "mace_smash" | "magic" | "magma" | "none" | "override" | "piston" | "projectile" | "ram_attack" | "self_destruct" | "sonic_boom" | "soul_campfire" | "stalactite" | "stalagmite" | "starve" | "suffocation" | "temperature" | "thorns" | "void" | "wither">;
  /** The amount of time the mob will remain playing dead (in seconds).
   * @default 1 */
  duration?: number;
  /** The list of other triggers that are required for the mob to activate play dead */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** The amount of health at which damage will cause the mob to play dead.
   * @default 0 */
  force_below_health?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The range of damage that may cause the goal to start depending on randomness. Damage taken below the min will never cause the goal to start. Damage taken above the max will always cause the goal to start. */
  random_damage_range?: number | [number, number] | Intrange;
  /** The likelihood of this goal starting upon taking damage.
   * @default 1 */
  random_start_chance?: number;
};
export type EntityMinecraftBehaviorRamAttack = {
  /** The event to trigger when attacking
  
  Sample values:
  • goat: [{"event":"start_event","target":"self"}] */
  on_start?: Array<string | EntityActordefinitiontrigger>;
  /** The modifier to knockback that babies have.
   * @default 0.3333333432674408 */
  baby_knockback_modifier?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Minimum and maximum cooldown time-range (positive, in seconds) between each attempted ram attack.
  
  Sample values:
  • goat: {"min":30,"max":300}
  • goat: {"min":5,"max":15} */
  cooldown_range?: number | [number, number] | Floatrange;
  /** The force of the knockback of the ram attack.
  
  Sample values:
  • goat: 2.5
   * @default 5 */
  knockback_force?: number;
  /** The height of the knockback of the ram attack.
  
  Sample values:
  • goat: 0.04
   * @default 0.10000000149011612 */
  knockback_height?: number;
  /** The minimum distance at which the mob can start a ram attack.
  
  Sample values:
  • goat: 4
   * @default 4 */
  min_ram_distance?: number;
  /** The sound to play when an entity is about to perform a ram attack.
  
  Sample values:
  • goat: pre_ram
  • goat: pre_ram.screamer
   * @default "undefined" */
  pre_ram_sound?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • goat: 5
   * @default 0 */
  priority?: number;
  /** The distance at which the mob start to run with ram speed.
  
  Sample values:
  • goat: 7
   * @default 7 */
  ram_distance?: number;
  /** The sound to play when an entity is impacting on a ram attack.
  
  Sample values:
  • goat: ram_impact
  • goat: ram_impact.screamer
   * @default "undefined" */
  ram_impact_sound?: "absorb_block" | "activate" | "add.chest" | "admire" | "agitated" | "ambient" | "ambient.aggressive" | "ambient.baby" | "ambient.basalt_deltas.additions" | "ambient.basalt_deltas.loop" | "ambient.basalt_deltas.mood" | "ambient.candle" | "ambient.cave" | "ambient.crimson_forest.additions" | "ambient.crimson_forest.loop" | "ambient.crimson_forest.mood" | "ambient.in.air" | "ambient.in.raid" | "ambient.in.water" | "ambient.nether_wastes.additions" | "ambient.nether_wastes.loop" | "ambient.nether_wastes.mood" | "ambient.pollinate" | "ambient.screamer" | "ambient.soulsand_valley.additions" | "ambient.soulsand_valley.loop" | "ambient.soulsand_valley.mood" | "ambient.tame" | "ambient.underwater.enter" | "ambient.underwater.exit" | "ambient.warped_forest.additions" | "ambient.warped_forest.loop" | "ambient.warped_forest.mood" | "ambient.weather.the_end_light_flash" | "ambient.worried" | "angry" | "apply_effect.bad_omen" | "apply_effect.raid_omen" | "apply_effect.trial_omen" | "armor" | "armor.break_wolf" | "armor.crack_wolf" | "armor.equip_chain" | "armor.equip_copper" | "armor.equip_diamond" | "armor.equip_elytra" | "armor.equip_generic" | "armor.equip_gold" | "armor.equip_iron" | "armor.equip_leather" | "armor.equip_netherite" | "armor.equip_wolf" | "armor.repair_wolf" | "armor.unequip_generic" | "armor.unequip_wolf" | "attach" | "attack" | "attack.critical" | "attack.nodamage" | "attack.strong" | "balloonpop" | "beacon.activate" | "beacon.ambient" | "beacon.deactivate" | "beacon.power" | "blast" | "block.bamboo_sapling.place" | "block.barrel.close" | "block.barrel.open" | "block.beehive.drip" | "block.beehive.enter" | "block.beehive.exit" | "block.beehive.shear" | "block.beehive.work" | "block.bell.hit" | "block.blastfurnace.fire_crackle" | "block.campfire.crackle" | "block.cartography_table.use" | "block.click" | "block.click.fail" | "block.composter.empty" | "block.composter.fill" | "block.composter.fill_success" | "block.composter.ready" | "block.copper_bulb.turn_off" | "block.copper_bulb.turn_on" | "block.creaking_heart.trail" | "block.decorated_pot.insert" | "block.decorated_pot.insert_fail" | "block.enchanting_table.use" | "block.end_portal.spawn" | "block.end_portal_frame.fill" | "block.fletching_table.use" | "block.frog_spawn.break" | "block.frog_spawn.hatch" | "block.furnace.lit" | "block.grindstone.use" | "block.loom.use" | "block.scaffolding.climb" | "block.sculk.spread" | "block.sculk_catalyst.bloom" | "block.sculk_sensor.place" | "block.sculk_shrieker.place" | "block.sculk_shrieker.shriek" | "block.sign.waxed_interact_fail" | "block.smithing_table.use" | "block.smoker.smoke" | "block.sniffer_egg.crack" | "block.sniffer_egg.hatch" | "block.stonecutter.use" | "block.sweet_berry_bush.hurt" | "block.sweet_berry_bush.pick" | "block.turtle_egg.attack" | "block.turtle_egg.break" | "block.turtle_egg.crack" | "block.turtle_egg.hatch" | "boost" | "born" | "bottle.dragonbreath" | "bottle.empty" | "bottle.fill" | "bounce" | "bow" | "bow.hit" | "break" | "break.block" | "break_pot" | "breathe" | "breeze_wind_charge.burst" | "brush" | "brush_completed" | "bubble.down" | "bubble.downinside" | "bubble.pop" | "bubble.up" | "bubble.upinside" | "bucket.empty.fish" | "bucket.empty.land_animal" | "bucket.empty.lava" | "bucket.empty.powder_snow" | "bucket.empty.water" | "bucket.fill.fish" | "bucket.fill.land_animal" | "bucket.fill.lava" | "bucket.fill.powder_snow" | "bucket.fill.water" | "bullet.hit" | "bundle.drop_contents" | "bundle.insert" | "bundle.insert_fail" | "bundle.remove_one" | "burp" | "button.click_off" | "button.click_on" | "cake.add_candle" | "camera.take_picture" | "cant_breed" | "cast.spell" | "cauldron_drip.lava.pointed_dripstone" | "cauldron_drip.water.pointed_dripstone" | "celebrate" | "charge" | "charge.sculk" | "chest.closed" | "chest.open" | "chime.amethyst_block" | "chorusdeath" | "chorusgrow" | "close" | "close_long" | "conduit.activate" | "conduit.ambient" | "conduit.attack" | "conduit.deactivate" | "conduit.short" | "convert_mooshroom" | "convert_to_drowned" | "convert_to_frog" | "convert_to_stray" | "converted_to_zombified" | "copper.wax.off" | "copper.wax.on" | "crafter.craft" | "crafter.disable_slot" | "crafter.fail" | "creaking_heart_spawn" | "crossbow.loading.end" | "crossbow.loading.middle" | "crossbow.loading.start" | "crossbow.quick_charge.end" | "crossbow.quick_charge.middle" | "crossbow.quick_charge.start" | "crossbow.shoot" | "dash_ready" | "deactivate" | "death" | "death.baby" | "death.in.water" | "death.mid.volume" | "death.min.volume" | "death.screamer" | "death.to.zombie" | "default" | "deny" | "detach" | "disappeared" | "dismount" | "door.close" | "door.open" | "drink" | "drink.honey" | "drink.milk" | "drip.lava.pointed_dripstone" | "drip.water.pointed_dripstone" | "drop.slot" | "eat" | "eject_block" | "elderguardian.curse" | "elemconstruct.open" | "enderchest.closed" | "enderchest.open" | "explode" | "extinguish.candle" | "extinguish.fire" | "fall" | "fall.big" | "fall.small" | "fang" | "fence_gate.close" | "fence_gate.open" | "fire" | "fizz" | "flap" | "flop" | "fly" | "freeze" | "fuse" | "gallop" | "geyser_continuous_eruption_active" | "geyser_continuous_eruption_start" | "geyser_eruption_active" | "geyser_eruption_start" | "glass" | "glow_squid.ink_squirt" | "glowstick.use" | "growl" | "haggle" | "haggle.idle" | "haggle.no" | "haggle.yes" | "heartbeat" | "heavy.step" | "hit" | "horn_break" | "horn_call0" | "horn_call1" | "horn_call2" | "horn_call3" | "horn_call4" | "horn_call5" | "horn_call6" | "horn_call7" | "hurt" | "hurt.baby" | "hurt.in.water" | "hurt.reduced" | "hurt.screamer" | "icebomb.hit" | "ignite" | "imitate.blaze" | "imitate.bogged" | "imitate.breeze" | "imitate.camel_husk" | "imitate.cave_spider" | "imitate.creaking" | "imitate.creeper" | "imitate.drowned" | "imitate.elder_guardian" | "imitate.ender_dragon" | "imitate.enderman" | "imitate.endermite" | "imitate.evocation_illager" | "imitate.ghast" | "imitate.guardian" | "imitate.happy_ghast" | "imitate.husk" | "imitate.magma_cube" | "imitate.parched" | "imitate.phantom" | "imitate.pillager" | "imitate.polar_bear" | "imitate.ravager" | "imitate.shulker" | "imitate.silverfish" | "imitate.skeleton" | "imitate.slime" | "imitate.spider" | "imitate.stray" | "imitate.vex" | "imitate.vindication_illager" | "imitate.warden" | "imitate.witch" | "imitate.wither" | "imitate.wither_skeleton" | "imitate.wolf" | "imitate.zoglin" | "imitate.zombie" | "imitate.zombie_pigman" | "imitate.zombie_villager" | "insert" | "insert_enchanted" | "irongolem.crack" | "irongolem.repair" | "item.book.put" | "item.copper_spear.attack_hit" | "item.copper_spear.attack_miss" | "item.copper_spear.use" | "item.diamond_spear.attack_hit" | "item.diamond_spear.attack_miss" | "item.diamond_spear.use" | "item.enchant.lunge1" | "item.enchant.lunge2" | "item.enchant.lunge3" | "item.fizz" | "item.golden_spear.attack_hit" | "item.golden_spear.attack_miss" | "item.golden_spear.use" | "item.iron_spear.attack_hit" | "item.iron_spear.attack_miss" | "item.iron_spear.use" | "item.netherite_spear.attack_hit" | "item.netherite_spear.attack_miss" | "item.netherite_spear.use" | "item.shield.block" | "item.spear.attack_hit" | "item.spear.attack_miss" | "item.spear.use" | "item.spyglass.stop_using" | "item.spyglass.use" | "item.stone_spear.attack_hit" | "item.stone_spear.attack_miss" | "item.stone_spear.use" | "item.trident.hit" | "item.trident.hit_ground" | "item.trident.return" | "item.trident.riptide_1" | "item.trident.riptide_2" | "item.trident.riptide_3" | "item.trident.throw" | "item.trident.thunder" | "item.use.on" | "item.wooden_spear.attack_hit" | "item.wooden_spear.attack_miss" | "item.wooden_spear.use" | "item_given" | "item_taken" | "item_thrown" | "jump" | "jump.prevent" | "jump_to_block" | "land" | "large.blast" | "launch" | "lava" | "lava.pop" | "lay_egg" | "lay_spawn" | "lead.break" | "lead.leash" | "lead.unleash" | "leashknot.break" | "leashknot.place" | "levelup" | "listening" | "listening_angry" | "lodestone_compass.link_compass_to_lodestone" | "lt.reaction.bleach" | "lt.reaction.epaste" | "lt.reaction.epaste2" | "lt.reaction.fertilizer" | "lt.reaction.fire" | "lt.reaction.fireball" | "lt.reaction.icebomb" | "lt.reaction.mgsalt" | "lt.reaction.miscexplosion" | "lt.reaction.miscfire" | "lt.reaction.miscmystical" | "lt.reaction.miscmystical2" | "lt.reaction.product" | "mace.heavy_smash_ground" | "mace.smash_air" | "mace.smash_ground" | "mad" | "milk" | "milk.screamer" | "milk_suspiciously" | "mob.armadillo.brush" | "mob.armadillo.scute_drop" | "mob.armor_stand.place" | "mob.hoglin.converted_to_zombified" | "mob.husk.convert_to_zombie" | "mob.pig.death" | "mob.player.hurt_drown" | "mob.player.hurt_freeze" | "mob.player.hurt_on_fire" | "mob.warning" | "mob.warning.baby" | "mount" | "multi_swap" | "nearby_close" | "nearby_closer" | "nearby_closest" | "note" | "note.bass" | "ominous_bottle.end_use" | "ominous_item_spawner.about_to_spawn_item" | "ominous_item_spawner.spawn_item" | "ominous_item_spawner.spawn_item_begin" | "open" | "open_long" | "panic" | "pant" | "particle.soul_escape.loud" | "particle.soul_escape.quiet" | "pause_growth" | "pick_berries.cave_vines" | "pickup" | "pickup_enchanted" | "piston.in" | "piston.out" | "place" | "place_in_water" | "place_item" | "plop" | "pop" | "portal" | "portal.travel" | "potion.brewed" | "power.off" | "power.off.sculk_sensor" | "power.on" | "power.on.sculk_sensor" | "pre_ram" | "pre_ram.screamer" | "prepare.attack" | "prepare.summon" | "prepare.wololo" | "presneeze" | "pressure_plate.click_off" | "pressure_plate.click_on" | "pumpkin.carve" | "purr" | "purreow" | "pushed_by_player" | "raid.horn" | "ram_impact" | "ram_impact.screamer" | "random.anvil_use" | "reappeared" | "record.11" | "record.13" | "record.5" | "record.blocks" | "record.bounce" | "record.cat" | "record.chirp" | "record.creator" | "record.creator_music_box" | "record.far" | "record.lava_chicken" | "record.mall" | "record.mellohi" | "record.null" | "record.otherside" | "record.pigstep" | "record.precipice" | "record.relic" | "record.stal" | "record.strad" | "record.tears" | "record.wait" | "record.ward" | "reflect" | "remedy" | "reset_growth" | "respawn_anchor.ambient" | "respawn_anchor.charge" | "respawn_anchor.deplete" | "respawn_anchor.set_spawn" | "retreat" | "roar" | "saddle" | "saddle_in_water" | "scared" | "scrape" | "screech" | "shake" | "shatter_pot" | "shear" | "shoot" | "shulker.close" | "shulker.open" | "shulkerbox.closed" | "shulkerbox.open" | "single_swap" | "sleep" | "slime_landing" | "smithing_table.use" | "sneeze" | "sonic_boom" | "sonic_charge" | "sparkler.active" | "sparkler.use" | "spawn" | "splash" | "sponge.absorb" | "squid.ink_squirt" | "squish.big" | "squish.small" | "stare" | "state_change" | "step" | "step.baby" | "step_lava" | "step_sand" | "straw_bed.break_leave" | "stun" | "swim" | "swoop" | "takeoff" | "teleport" | "tempt" | "thorns" | "throw" | "thunder" | "tilt_down.big_dripleaf" | "tilt_up.big_dripleaf" | "tongue" | "trapdoor.close" | "trapdoor.open" | "trial_spawner.ambient" | "trial_spawner.ambient_ominous" | "trial_spawner.charge_activate" | "trial_spawner.close_shutter" | "trial_spawner.detect_player" | "trial_spawner.eject_item" | "trial_spawner.open_shutter" | "trial_spawner.spawn_mob" | "tripod" | "twinkle" | "ui.cartography_table.take_result" | "ui.loom.take_result" | "ui.stonecutter.take_result" | "undefined" | "unfect" | "unfreeze" | "unsaddle" | "vault.activate" | "vault.ambient" | "vault.close_shutter" | "vault.deactivate" | "vault.eject_item" | "vault.insert_item" | "vault.insert_item_fail" | "vault.open_shutter" | "vault.reject_rewarded_player" | "warn" | "water" | "whine" | "wind_charge.burst";
  /** Sets the entity's speed when charging toward the target.
  
  Sample values:
  • goat: 1.8
   * @default 2 */
  ram_speed?: number;
  /** Sets the entity's speed when running toward the target.
  
  Sample values:
  • goat: 0.7
   * @default 1 */
  run_speed?: number;
};
export type EntityMinecraftBehaviorRandomSearchAndDig = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Goal cooldown range in seconds.
  
  Sample values:
  • sniffer: {"min":0,"max":0} */
  cooldown_range?: number | [number, number] | Floatrange;
  /** Digging duration in seconds.
  
  Sample values:
  • sniffer: {"min":8,"max":10} */
  digging_duration_range?: number | [number, number] | Floatrange;
  /** Amount of retries to find a valid target position within search range.
  
  Sample values:
  • sniffer: 5
   * @default 5 */
  find_valid_position_retries?: number;
  /** Distance in blocks within the entity to considers it has reached it's target position.
  
  Sample values:
  • sniffer: 2
   * @default 1.5 */
  goal_radius?: number;
  /** File path relative to the resource pack root for items to spawn list (loot table format).
  
  Sample values:
  • sniffer: loot_tables/gameplay/entities/sniffer_seeds.json
   * @default "" */
  item_table?: string;
  /** Event to run when the goal ends searching has begins digging.
  
  Sample values:
  • sniffer: {"event":"on_digging_start","target":"self"} */
  on_digging_start?: EntityActordefinitiontrigger;
  /** Event to run when the goal failed while in digging state.
  
  Sample values:
  • sniffer: {"event":"on_fail_during_digging","target":"self"} */
  on_fail_during_digging?: EntityActordefinitiontrigger;
  /** Event to run when the goal failed while in searching state.
  
  Sample values:
  • sniffer: {"event":"on_fail_during_searching","target":"s... */
  on_fail_during_searching?: EntityActordefinitiontrigger;
  /** Event to run when the goal find a item.
  
  Sample values:
  • sniffer: {"event":"on_item_found","target":"self"} */
  on_item_found?: EntityActordefinitiontrigger;
  /** Event to run when the goal starts searching.
  
  Sample values:
  • sniffer: {"event":"on_searching_start","target":"self"} */
  on_searching_start?: EntityActordefinitiontrigger;
  /** Event to run when searching and digging has ended.
  
  Sample values:
  • sniffer: {"event":"on_search_and_digging_success","targe... */
  on_success?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • sniffer: 5
   * @default 0 */
  priority?: number;
  /** Width and length of the volume around the entity used to find a valid target position
  
  Sample values:
  • sniffer: 20
   * @default 10 */
  search_range_xz?: number;
  /** Height of the volume around the entity used to find a valid target position
  
  Sample values:
  • sniffer: 3
   * @default 7 */
  search_range_y?: number;
  /** Digging duration before spawning item in seconds.
  
  Sample values:
  • sniffer: 6
   * @default 0 */
  spawn_item_after_seconds?: number;
  /** Distance to offset the item's spawn location in the direction the mob is facing.
  
  Sample values:
  • sniffer: 2.25
   * @default 0 */
  spawn_item_pos_offset?: number;
  /** Searching movement speed multiplier.
  
  Sample values:
  • sniffer: 1.25
   * @default 1 */
  speed_multiplier?: number;
  /** List of target block types the goal will look to dig on. Overrides the default list.
  
  Sample values:
  • sniffer: ["minecraft:dirt","minecraft:coarse_dirt","mine... */
  target_blocks?: (Array<{
      /** Name
       * @default "" */
      name?: string;
      /** States */
      states?: number | string | boolean;
      /** Tags
       * @default "" */
      tags?: string;
    }>) | string | Record<string, unknown>;
  /** Dig target position offset from the feet position of the mob in their facing direction.
   * @default 2.25 */
  target_dig_position_offset?: number;
};
export type EntityMinecraftBehaviorRangedAttack = {
  /** Reload-time range (in seconds), when not using a charged shot. Reload-time range scales with target-distance.
  
  Sample values:
  • blaze: {"min":3,"max":5}
  • bogged: 3.5
  • bogged: 2.5 */
  attack_interval?: number | [number, number] | Floatrange;
  /** Range of distances from the target within which the entity can perform a ranged attack.
  
  Sample values:
  • blaze: {"min":0,"max":48}
  • drowned: {"min":0,"max":10} */
  attack_range?: number | [number, number] | Floatrange;
  /** Time (in seconds) between each individual shot when firing a burst of shots from a charged up attack.
  
  Sample values:
  • blaze: 0.3
   * @default 0 */
  burst_interval?: number;
  /** Number of shots fired every time the attacking entity uses a charged up attack.
  
  Sample values:
  • blaze: 3
   * @default 1 */
  burst_shots?: number;
  /** Time (in seconds, then add "charge_shoot_trigger"), before a charged up attack is done charging. Charge-time decays while target is not in sight.
  
  Sample values:
  • llama: 1
   * @default 0 */
  charge_charged_trigger?: number;
  /** Amount of time (in seconds, then doubled) a charged shot must be charging before reloading burst shots. Charge-time decays while target is not in sight.
  
  Sample values:
  • blaze: 4
  • llama: 2
   * @default 0 */
  charge_shoot_trigger?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Controls how the entity moves while its target is within the configured attack range. "hold_position" makes the entity stop and hold its position while facing and attacking the target. "follow_target" makes the entity continue moving toward the target while attacking, stopping just outside the minimum attack range.
   * @default "hold_position" */
  in_range_movement_mode?: "follow_target" | "hold_position";
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • blaze: 3
  • llama: 2
  • parched: 1
   * @default 0 */
  priority?: number;
  /** Field of view (in degrees) when using sensing to detect a target for attack.
   * @default 90 */
  ranged_fov?: number;
  /** Allows the actor to be set to persist upon targeting a player
   * @default false */
  set_persistent?: boolean;
  /** During attack behavior, this multiplier modifies the entity's speed when moving toward the target.
   * @default 1 */
  speed_multiplier?: number;
  /** If a swing animation (using variable.attack_time) exists, this causes the actor to swing their arm(s) upon firing the ranged attack.
  
  Sample values:
  • drowned: true
   * @default false */
  swing?: boolean;
  /** Minimum amount of time (in seconds) the attacking entity needs to see the target before moving toward it.
   * @default 1 */
  target_in_sight_time?: number;
  /** Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
   * @default 30 */
  x_max_rotation?: number;
  /** Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
   * @default 30 */
  y_max_head_rotation?: number;
  /** Minimum distance to target before this entity will attempt to shoot.
  
  Sample values:
  • bogged: 15
  • llama: 64
   * @default 0 */
  attack_radius?: number;
  /** Maximum bound for reload-time range (in seconds), when not using a charged shot. Reload-time range scales with target-distance.
   * @default 0 */
  attack_interval_max?: number;
  /** Minimum bound for reload-time range (in seconds), when not using a charged shot. Reload-time range scales with target-distance.
   * @default 0 */
  attack_interval_min?: number;
  /** Minimum distance the target can be for this mob to fire. If the target is closer, this mob will move first before firing
   * @default 0 */
  attack_radius_min?: number;
};
export type EntityMinecraftBehaviorRoar = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The amount of time to roar for.
  
  Sample values:
  • warden: 4.2
   * @default 0 */
  duration?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • warden: 2
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorSlimeAttack = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Grow Tired Cooldown Time
   * @default 15 */
  grow_tired_cooldown_time?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • magma_cube: 3
   * @default 0 */
  priority?: number;
  /** Allows the actor to be set to persist upon targeting a player
   * @default false */
  set_persistent?: boolean;
  /** During attack behavior, this multiplier modifies the entity's speed when moving toward the target.
   * @default 1 */
  speed_multiplier?: number;
  /** Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
   * @default 10 */
  x_max_rotation?: number;
  /** Maximum rotation (in degrees), on the Y-axis, this entity can rotate while trying to look at the target.
   * @default 10 */
  y_max_rotation?: number;
};
export type EntityMinecraftBehaviorSlimeFloat = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Percent chance a slime or magma cube has to jump while in water / lava.
   * @default 0.800000011920929 */
  jump_chance_percentage?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • magma_cube: 1
   * @default 0 */
  priority?: number;
  /** Determines the multiplier the entity's speed is modified by when moving through water / lava.
   * @default 1.2000000476837158 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorSlimeKeepOnJumping = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • magma_cube: 5
   * @default 0 */
  priority?: number;
  /** Determines the multiplier this entity's speed is modified by when jumping around.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorSlimeRandomDirection = {
  /** Additional time (in whole seconds), chosen randomly in the range of [0, "add_random_time_range"], to add to "min_change_direction_time".
   * @default 3 */
  add_random_time_range?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Constant minimum time (in seconds) to wait before choosing a new direction.
   * @default 2 */
  min_change_direction_time?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • magma_cube: 4
   * @default 0 */
  priority?: number;
  /** Maximum rotation angle range (in degrees) when randomly choosing a new direction.
   * @default 360 */
  turn_range?: number;
};
export type EntityMinecraftBehaviorSniff = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Cooldown range between sniffs in seconds
  
  Sample values:
  • warden: {"min":5,"max":10} */
  cooldown_range?: number | [number, number] | Floatrange;
  /** Sniffing duration in seconds
  
  Sample values:
  • warden: 4.16
   * @default 1 */
  duration?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • warden: 6
   * @default 0 */
  priority?: number;
  /** Mob detection radius
  
  Sample values:
  • warden: 24
   * @default 5 */
  sniffing_radius?: number;
  /** Mob suspicion horizontal radius. When a player is within this radius horizontally, the anger level towards that player is increased
  
  Sample values:
  • warden: 6
   * @default 3 */
  suspicion_radius_horizontal?: number;
  /** Mob suspicion vertical radius. When a player is within this radius vertically, the anger level towards that player is increased
  
  Sample values:
  • warden: 20
   * @default 3 */
  suspicion_radius_vertical?: number;
};
export type EntityMinecraftBehaviorSonicBoom = {
  /** Cooldown in seconds required after using this attack until the entity can use sonic boom again.
  
  Sample values:
  • warden: 2
   * @default 5 */
  attack_cooldown?: number;
  /** Attack damage of the sonic boom.
  
  Sample values:
  • warden: 10
   * @default 30 */
  attack_damage?: number;
  /** Horizontal range (in blocks) at which the sonic boom can damage the target.
   * @default 15 */
  attack_range_horizontal?: number;
  /** Vertical range (in blocks) at which the sonic boom can damage the target.
   * @default 20 */
  attack_range_vertical?: number;
  /** Sound event for the attack.
  
  Sample values:
  • warden: sonic_boom
   * @default "" */
  attack_sound?: string;
  /** Sound event for the charge up.
  
  Sample values:
  • warden: sonic_charge
   * @default "" */
  charge_sound?: string;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Goal duration in seconds
  
  Sample values:
  • warden: 3
   * @default 0 */
  duration?: number;
  /** Duration in seconds until the attack sound is played.
   * @default 1.7000000476837158 */
  duration_until_attack_sound?: number;
  /** Height cap of the attack knockback's vertical delta.
  
  Sample values:
  • warden: 0.5
   * @default 0 */
  knockback_height_cap?: number;
  /** Horizontal strength of the attack's knockback applied to the attack target.
  
  Sample values:
  • warden: 2.5
   * @default 0 */
  knockback_horizontal_strength?: number;
  /** Vertical strength of the attack's knockback applied to the attack target.
  
  Sample values:
  • warden: 0.5
   * @default 0 */
  knockback_vertical_strength?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • warden: 3
   * @default 0 */
  priority?: number;
  /** This multiplier modifies the attacking entity's speed when moving toward the target.
  
  Sample values:
  • warden: 1.2
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorStayNearNoteblock = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Sets the time an entity should stay near a noteblock after hearing it.
   * @default 30 */
  listen_time?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • allay: 5
   * @default 0 */
  priority?: number;
  /** Sets the entity's speed when moving toward the block.
  
  Sample values:
  • allay: 8
   * @default 1 */
  speed?: number;
  /** Sets the distance the entity needs to be away from the block to attempt to start the goal.
  
  Sample values:
  • allay: 16
   * @default 10 */
  start_distance?: number;
  /** Sets the distance from the block the entity will attempt to reach.
  
  Sample values:
  • allay: 4
   * @default 2 */
  stop_distance?: number;
};
export type EntityMinecraftBehaviorStompAttack = {
  /** Allows the mob to perform this melee attack behavior only once during its lifetime.
   * @default false */
  attack_once?: boolean;
  /** Defines the entity types this entity will attack.
   * @default "" */
  attack_types?: string;
  /** Allows the mob, if on fire and empty handed, to ignite its target upon a successful attack.
   * @default false */
  can_spread_on_fire?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Cooldown time, in seconds, between consecutive attacks.
   * @default 1 */
  cooldown_time?: number;
  /** Time, in seconds, added to the attack path recalculation interval when the target is beyond "path_inner_boundary".
   * @default 0.25 */
  inner_boundary_time_increase?: number;
  /** Maximum base time, in seconds, before recalculating a new attack path to the target (before increases are applied).
   * @default 0.550000011920929 */
  max_path_time?: number;
  /** Minimum base time, in seconds, before recalculating a new attack path to the target (before increases are applied).
   * @default 0.20000000298023224 */
  min_path_time?: number;
  /** Multiplied with the final AoE damage range to determine a no damage range. The stomp attack will go on cooldown if target is in this no damage range.
  
  Sample values:
  • polar_bear: 2
   * @default 2 */
  no_damage_range_multiplier?: number;
  /** Defines the event to trigger when this entity successfully attacks. */
  on_attack?: EntityActordefinitiontrigger;
  /** Defines the event to trigger when this entity kills the target. */
  on_kill?: EntityActordefinitiontrigger;
  /** Time, in seconds, added to the attack path recalculation interval when the target is beyond "path_outer_boundary".
   * @default 0.5 */
  outer_boundary_time_increase?: number;
  /** Time, in seconds, added to the attack path recalculation interval when the mob cannot move along the current path.
   * @default 0.75 */
  path_fail_time_increase?: number;
  /** Distance at which to increase attack path recalculation by "inner_boundary_time_increase".
   * @default 16 */
  path_inner_boundary?: number;
  /** Distance at which to increase attack path recalculation by "outer_boundary_time_increase".
   * @default 32 */
  path_outer_boundary?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • polar_bear: 1
   * @default 0 */
  priority?: number;
  /** Defines a 1-in-N chance for the mob to stop its current attack, where N equals "random_stop_interval".
   * @default 0 */
  random_stop_interval?: number;
  /** Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
   * @default 2 */
  reach_multiplier?: number;
  /** Specifies whether a full navigation path from the mob to the target is required.
  
  Sample values:
  • polar_bear: true
   * @default false */
  require_complete_path?: boolean;
  /** Multiplier applied to the mob's movement speed when moving toward its target.
   * @default 1 */
  speed_multiplier?: number;
  /** Multiplied with the base size of the entity to determine stomp AoE damage range.
  
  Sample values:
  • polar_bear: 2
   * @default 2 */
  stomp_range_multiplier?: number;
  /** Allows the mob to track its target even if it lacks a hard-coded sensing component.
  
  Sample values:
  • polar_bear: true
   * @default false */
  track_target?: boolean;
  /** Maximum rotation, in degrees, on the X-axis while the mob is trying to look at its target.
   * @default 30 */
  x_max_rotation?: number;
  /** Maximum rotation, in degrees, on the Y-axis while the mob is trying to look at its target.
   * @default 30 */
  y_max_head_rotation?: number;
};
export type EntityMinecraftBehaviorSwimIdle = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Amount of time (in seconds) to stay idle.
   * @default 5 */
  idle_time?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Percent chance this entity will go idle, 1.0 = 100%.
   * @default 0.10000000149011612 */
  success_rate?: number;
};
export type EntityMinecraftBehaviorSwimUpForBreath = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The material the mob is traveling in. An air block will only be considered valid to move to with a block of this material below it. Options are: "water", "lava", or "any".
   * @default "water" */
  material_type?: string;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • dolphin: 1
   * @default 0 */
  priority?: number;
  /** The height (in blocks) above the mob's current position that it will search for a valid air block to move to. If a valid block cannot be found, the mob will move to the position this many blocks above it.
   * @default 16 */
  search_height?: number;
  /** The radius (in blocks) around the mob's current position that it will search for a valid air block to move to.
   * @default 4 */
  search_radius?: number;
  /** Movement speed multiplier of the mob when using this Goal.
   * @default 1.399999976158142 */
  speed_mod?: number;
};
export type EntityMinecraftBehaviorSwimWander = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Percent chance to start wandering, when not path-finding. 1 = 100%
   * @default 0.008329999633133411 */
  interval?: number;
  /** Distance to look ahead for obstacle avoidance, while wandering.
   * @default 5 */
  look_ahead?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** This multiplier modifies the entity's speed when wandering.
   * @default 1 */
  speed_multiplier?: number;
  /** Amount of time (in seconds) to wander after wandering behavior was successfully started.
   * @default 5 */
  wander_time?: number;
};
export type EntityMinecraftBehaviorSwimWithEntity = {
  /** The multiplier this entity's speed is modified by when matching another entity's direction.
  
  Sample values:
  • dolphin: 2.5
   * @default 2.5 */
  catch_up_multiplier?: number;
  /** Distance, from the entity being followed, at which this entity will speed up to reach that entity.
  
  Sample values:
  • dolphin: 12
   * @default 12 */
  catch_up_threshold?: number;
  /** Percent chance to stop following the current entity, if they're riding another entity or they're not swimming. 1.0 = 100%
  
  Sample values:
  • dolphin: 0.0333
   * @default 0.0333 */
  chance_to_stop?: number;
  /** Filters which types of entities are valid to follow.
  
  Sample values:
  • dolphin: [{"filters":{"test":"is_family","subject":"othe... */
  entity_types?: string[];
  /** Distance, from the entity being followed, at which this entity will try to match that entity's direction
  
  Sample values:
  • dolphin: 2
   * @default 2 */
  match_direction_threshold?: number;
  /** Radius around this entity to search for another entity to follow.
  
  Sample values:
  • dolphin: 20
   * @default 20 */
  search_range?: number;
  /** The multiplier this entity's speed is modified by when trying to catch up to the entity being followed.
  
  Sample values:
  • dolphin: 1.5
   * @default 1.5 */
  speed_multiplier?: number;
  /** Time (in seconds) between checks to determine if this entity should catch up to the entity being followed or match the direction of the entity being followed.
  
  Sample values:
  • dolphin: 0.5
   * @default 0.5 */
  state_check_interval?: number;
  /** Distance, from the entity being followed, at which this entity will stop following that entity.
  
  Sample values:
  • dolphin: 5
   * @default 5 */
  stop_distance?: number;
  /** Percent chance to start following another entity, if not already doing so. 1.0 = 100%
  
  Sample values:
  • dolphin: 0.1
   * @default 0.1 */
  success_rate?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorSwoopAttack = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Added to the base size of the entity, to determine the target's maximum allowable distance, when trying to deal attack damage.
   * @default 0.20000000298023224 */
  damage_reach?: number;
  /** Minimum and maximum cooldown time-range (in seconds) between each attempted swoop attack. */
  delay_range?: number | [number, number] | Floatrange;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • phantom: 2
   * @default 0 */
  priority?: number;
  /** During swoop attack behavior, this determines the multiplier the entity's speed is modified by when moving toward the target.
   * @default 1 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorTakeBlock = {
  /** If true, whether the goal is affected by the mob griefing game rule.
   * @default true */
  affected_by_griefing_rule?: boolean;
  /** Block descriptors for which blocks are valid to be taken by the entity, if empty all blocks are valid. */
  blocks?: (Array<{
      /** Name
       * @default "" */
      name?: string;
      /** States */
      states?: number | string | boolean;
      /** Tags
       * @default "" */
      tags?: string;
    }>) | string | Record<string, unknown>;
  /** Filters for if the entity should try to take a block. Self and Target are set. */
  can_take?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Chance each tick for the entity to try and take a block.
   * @default 1 */
  chance?: number;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Trigger ran if the entity does take a block. Self, Target, and Block are set. */
  on_take?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** If true, whether the entity needs line of sight to the block they are trying to take.
   * @default true */
  requires_line_of_sight?: boolean;
  /** XZ range from which the entity will try and take blocks from. */
  xz_range?: number | [number, number] | Intrange;
  /** Y range from which the entity will try and take blocks from. */
  y_range?: number | [number, number] | Intrange;
};
export type EntityMinecraftBehaviorTakeFlower = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Conditions that need to be met for the behavior to start. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
   * @default 30 */
  max_head_rotation_y?: number;
  /** Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
   * @default 30 */
  max_rotation_x?: number;
  /** The maximum amount of time (in seconds) for the mob to randomly wait for before taking the flower.
   * @default 20 */
  max_wait_time?: number;
  /** Minimum distance (in blocks) for the entity to be considered having reached its target.
   * @default 2 */
  min_distance_to_target?: number;
  /** The minimum amount of time (in seconds) for the mob to randomly wait for before taking the flower.
   * @default 4 */
  min_wait_time?: number;
  /** Event triggered when the entity takes a flower from another entity. */
  on_take_flower?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The dimensions of the AABB used to search for a potential mob to take a flower from. */
  search_area?: number[] | ({
      /** X
       * @default 0 */
      x?: number;
      /** Y
       * @default 0 */
      y?: number;
      /** Z
       * @default 0 */
      z?: number;
    });
  /** Movement speed multiplier of the mob when using this AI Goal.
   * @default 0.5 */
  speed_multiplier?: number;
};
export type EntityMinecraftBehaviorTeleportToOwner = {
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The time in seconds that must pass for the entity to be able to try to teleport again.
   * @default 1 */
  cooldown?: number;
  /** Conditions to be satisfied for the entity to teleport to its owner.
  
  Sample values:
  • parrot: {"all_of":[{"test":"owner_distance","operator":... */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorTimerFlag1 = {
  /** Goal cooldown range in seconds. Can be a range object or a single number.
  
  Sample values:
  • sniffer: {"min":400,"max":500} */
  cooldown_range?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** Goal duration range in seconds. Can be a range object or a single number.
  
  Sample values:
  • sniffer: {"min":2,"max":2} */
  duration_range?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** 
  
  Sample values:
  • sniffer: ["move","look"] */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Event(s) to run when the goal ends.
  
  Sample values:
  • sniffer: {"event":"on_scenting_success","target":"self"} */
  on_end?: EntityActordefinitiontrigger;
  /** Event(s) to run when the goal starts. */
  on_start?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • sniffer: 6
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorTimerFlag2 = {
  /** Goal cooldown range in seconds. Can be a range object or a single number.
  
  Sample values:
  • sniffer: {"min":0,"max":0} */
  cooldown_range?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** Goal duration range in seconds. Can be a range object or a single number.
  
  Sample values:
  • sniffer: {"min":2,"max":5} */
  duration_range?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** 
  
  Sample values:
  • sniffer: ["move"] */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Event(s) to run when the goal ends.
  
  Sample values:
  • sniffer: {"event":"on_rising_end","target":"self"} */
  on_end?: EntityActordefinitiontrigger;
  /** Event(s) to run when the goal starts. */
  on_start?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • sniffer: 2
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorTimerFlag3 = {
  /** Goal cooldown range in seconds. Can be a range object or a single number.
  
  Sample values:
  • sniffer: {"min":0,"max":0} */
  cooldown_range?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** Goal duration range in seconds. Can be a range object or a single number.
  
  Sample values:
  • sniffer: {"min":2,"max":5} */
  duration_range?: number | [number, number] | ({
      /** Minimum value of the range */
      min?: number;
      /** Maximum value of the range */
      max?: number;
    });
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** Event(s) to run when the goal ends.
  
  Sample values:
  • sniffer: {"event":"on_feeling_happy_end","target":"self"} */
  on_end?: EntityActordefinitiontrigger;
  /** Event(s) to run when the goal starts. */
  on_start?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
  
  Sample values:
  • sniffer: 5
   * @default 0 */
  priority?: number;
};
export type EntityMinecraftBehaviorTradeWithPlayer = {
  /** Conditions that need to be met for the behavior to start. */
  filters?: Record<string, unknown> | Array<Record<string, unknown>> | ({
      all_of?: Array<Record<string, unknown>>;
      any_of?: Array<Record<string, unknown>>;
      none_of?: Array<Record<string, unknown>>;
    });
  /** The max distance that the mob can be from the player before exiting the goal.
   * @default 8 */
  max_distance_from_player?: number;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal. */
  priority?: number;
};
export type EntityMinecraftBehaviorTransportItems = {
  /** A list of block descriptors that should be container types to put items in. Can be simple block identifier strings or objects with name, states, and tags. */
  destination_container_types?: string[] | (Array<{
      /** Block identifier like 'minecraft:chest' */
      name?: string;
      /** Block state values to match */
      states?: {
          [key: string]: string;
        };
      /** Block tags to match */
      tags?: string;
    }>);
  /** A list of block descriptors that should be container types to take items from. Can be simple block identifier strings or objects with name, states, and tags. */
  source_container_types?: string[] | (Array<{
      /** Block identifier like 'minecraft:chest' */
      name?: string;
      /** Block state values to match */
      states?: {
          [key: string]: string;
        };
      /** Block tags to match */
      tags?: string;
    }>);
  /** When true the mob will wait until a container is not used by other entities before starting to interact with it.
   * @default false */
  allow_simultaneous_interaction?: boolean;
  /** A list of item descriptors that are the only items the mob is allowed to transport. If this and "disallowed_items" are both empty, then all items are allowed. If non-empty "disallowed_items" must be empty. */
  allowed_items?: string | ({
      [key: string]: string;
    });
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** A list of item descriptors that are the mob is not allowed to transport. If non-empty "allowed_items" must be empty. */
  disallowed_items?: string | ({
      [key: string]: string;
    });
  /** When the mob cannot find a container in which to get or put items, the goal will stop being active for this amount of time in seconds.
   * @default 20 */
  idle_cooldown?: number;
  /** How long the mob will wait after spawning or getting the goal added before the goal can start.
   * @default 0 */
  initial_cooldown?: number;
  /** The amount of time in seconds spent interacting with the containers.
   * @default 3 */
  interaction_time?: number;
  /** The maximum stack size that the mob will try to take from a container.
   * @default 64 */
  max_stack_size?: number;
  /** The maximum number of containers that the mob will try to take/place items from before going on cooldown and starting over.
   * @default 16 */
  max_visited_containers?: number;
  /** The strategy to use for placing the transported item. Any - always place if there is room, With matching - place if there is a matching item in the container, With matching or empty - like With matching but will also place in empty containers
   * @default "any" */
  place_strategy?: "any" | "with_matching" | "with_matching_or_empty";
  /** Priority
   * @default 0 */
  priority?: number;
  /** The maximum search distance horizontally and vertically at which to find containers for taking or placing items. */
  search_distance?: number[] | ({
      /** X
       * @default 0 */
      x?: number;
      /** Y
       * @default 0 */
      y?: number;
    });
  /** The strategy to use for finding source or destination containers. The nearest valid container or a random valid container in range.
   * @default "random" */
  search_strategy?: "nearest" | "random";
};
export type EntityMinecraftBehaviorUseKineticWeapon = {
  /** The distance to the target within which the mob begins using its kinetic weapon.
   * @default 8 */
  approach_distance?: number;
  /** Allows the mob to perform this melee attack behavior only once during its lifetime.
   * @default false */
  attack_once?: boolean;
  /** Defines the entity types this entity will attack.
   * @default "" */
  attack_types?: string;
  /** Allows the mob, if on fire and empty handed, to ignite its target upon a successful attack.
   * @default false */
  can_spread_on_fire?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The distance the mob retreats to after all of the item's "minecraft:kinetic_weapon" component's "max_duration" values have elapsed. After reaching this position and once "cooldown" has elapsed, the mob will approach again. This value is added to the reach midpoint. */
  cooldown_distance?: number | [number, number] | Floatrange;
  /** Multiplier applied to the mob's movement speed while on cooldown.
   * @default 1 */
  cooldown_speed_multiplier?: number;
  /** Cooldown time, in seconds, between consecutive attacks.
   * @default 1 */
  cooldown_time?: number;
  /** Allows the mob to override its mount's navigation behavior with the logic defined by this goal. Requires the mount to be running the "minecraft:behavior.mount_pathing" goal, which default behavior will be ignored.
   * @default false */
  hijack_mount_navigation?: boolean;
  /** Time, in seconds, added to the attack path recalculation interval when the target is beyond "path_inner_boundary".
   * @default 0.25 */
  inner_boundary_time_increase?: number;
  /** Maximum base time, in seconds, before recalculating a new attack path to the target (before increases are applied).
   * @default 0.550000011920929 */
  max_path_time?: number;
  /** Field of view, in degrees, used by the hard-coded sensing component to detect a valid attack target.
   * @default 90 */
  melee_fov?: number;
  /** Minimum base time, in seconds, before recalculating a new attack path to the target (before increases are applied).
   * @default 0.20000000298023224 */
  min_path_time?: number;
  /** Defines the event to trigger when this entity successfully attacks. */
  on_attack?: EntityActordefinitiontrigger;
  /** Defines the event to trigger when this entity kills the target. */
  on_kill?: EntityActordefinitiontrigger;
  /** Time, in seconds, added to the attack path recalculation interval when the target is beyond "path_outer_boundary".
   * @default 0.5 */
  outer_boundary_time_increase?: number;
  /** Time, in seconds, added to the attack path recalculation interval when the mob cannot move along the current path.
   * @default 0.75 */
  path_fail_time_increase?: number;
  /** Distance at which to increase attack path recalculation by "inner_boundary_time_increase".
   * @default 16 */
  path_inner_boundary?: number;
  /** Distance at which to increase attack path recalculation by "outer_boundary_time_increase".
   * @default 32 */
  path_outer_boundary?: number;
  /** Priority
   * @default 0 */
  priority?: number;
  /** Defines a 1-in-N chance for the mob to stop its current attack, where N equals "random_stop_interval".
   * @default 0 */
  random_stop_interval?: number;
  /** The distance the mob retreats to once the target is closer than the midpoint of the item's "minecraft:kinetic_weapon" component's minimum and maximum "reach". After reaching this position, the mob will charge again. This value is added to the reach midpoint. */
  reposition_distance?: number | [number, number] | Floatrange;
  /** Multiplier applied to the mob's movement speed while repositioning.
   * @default 1 */
  reposition_speed_multiplier?: number;
  /** Specifies whether a full navigation path from the mob to the target is required.
   * @default false */
  require_complete_path?: boolean;
  /** Multiplier applied to the mob's movement speed when moving toward its target.
   * @default 1 */
  speed_multiplier?: number;
  /** Allows the mob to track its target even if it lacks a hard-coded sensing component.
   * @default false */
  track_target?: boolean;
  /** Multiplier applied to each "min_speed" and "min_relative_speed" condition in the item's "minecraft:kinetic_weapon" component.
   * @default 1 */
  weapon_min_speed_multiplier?: number;
  /** Multiplier applied to the item's "minecraft:kinetic_weapon" component's "reach".
   * @default 1 */
  weapon_reach_multiplier?: number;
  /** Maximum rotation, in degrees, on the X-axis while the mob is trying to look at its target.
   * @default 30 */
  x_max_rotation?: number;
  /** Maximum rotation, in degrees, on the Y-axis while the mob is trying to look at its target.
   * @default 30 */
  y_max_head_rotation?: number;
};
export type EntityMinecraftBehaviorWork = {
  /** The amount of ticks the NPC will stay in their the work location
   * @default 0 */
  active_time?: number;
  /** If true, this entity can work when their jobsite POI is being rained on.
   * @default false */
  can_work_in_rain?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The amount of ticks the goal will be on cooldown before it can be used again
   * @default 0 */
  goal_cooldown?: number;
  /** Event to run when the mob reaches their jobsite. */
  on_arrival?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** The max interval in which a sound will play.
   * @default 0 */
  sound_delay_max?: number;
  /** The min interval in which a sound will play.
   * @default 0 */
  sound_delay_min?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
   * @default 0.5 */
  speed_multiplier?: number;
  /** If "can_work_in_rain" is false, this is the maximum number of ticks left in the goal where rain will not interrupt the goal
   * @default -1 */
  work_in_rain_tolerance?: number;
};
export type EntityMinecraftBehaviorWorkComposter = {
  /** The amount of ticks the NPC will stay in their the work location
   * @default 0 */
  active_time?: number;
  /** The maximum number of times the mob will interact with the composter.
   * @default 1 */
  block_interaction_max?: number;
  /** Determines whether the mob can empty a full composter.
   * @default true */
  can_empty_composter?: boolean;
  /** Determines whether the mob can add items to a composter given that it is not full.
   * @default true */
  can_fill_composter?: boolean;
  /** If true, this entity can work when their jobsite POI is being rained on.
   * @default false */
  can_work_in_rain?: boolean;
  /** Control Flags */
  control_flags?: Array<"jump" | "look" | "move">;
  /** The amount of ticks the goal will be on cooldown before it can be used again
   * @default 0 */
  goal_cooldown?: number;
  /** The maximum number of items which can be added to the composter per block interaction.
   * @default 20 */
  items_per_use_max?: number;
  /** Limits the amount of each compostable item the mob can use. Any amount held over this number will be composted if possible
   * @default 10 */
  min_item_count?: number;
  /** Event to run when the mob reaches their jobsite. */
  on_arrival?: EntityActordefinitiontrigger;
  /** As priority approaches 0, the priority is increased. The higher the priority, the sooner this behavior will be executed as a goal.
   * @default 0 */
  priority?: number;
  /** Movement speed multiplier of the mob when using this AI Goal
   * @default 0.5 */
  speed_multiplier?: number;
  /** The maximum interval in which the mob will interact with the composter.
   * @default 200 */
  use_block_max?: number;
  /** The minimum interval in which the mob will interact with the composter.
   * @default 100 */
  use_block_min?: number;
  /** If "can_work_in_rain" is false, this is the maximum number of ticks left in the goal where rain will not interrupt the goal
   * @default -1 */
  work_in_rain_tolerance?: number;
};
export type EntityMinecraftBlockMovementSlowdownImmunity = {
  /** List of block descriptors whose existing movement slowdown contribution should be ignored. If omitted or empty, no contributions are ignored.
  
  Sample values:
  • cave_spider: ["minecraft:web"] */
  blocks?: (Array<{
      /** Name
       * @default "" */
      name?: string;
      /** States */
      states?: number | string | boolean;
      /** Tags
       * @default "" */
      tags?: string;
    }>) | string | Record<string, unknown>;
};
export type EntityMinecraftOnEquipmentChanged = {
  /** A list of slot-specific events to execute when the entity's equipment changes in those slots. */
  slots?: EntityOnequipmentchangedslotentrydescriptor[];
};
export type EntityOnequipmentchangedslotentrydescriptor = {
  /** Event to execute when the slot is changed to a non-empty item.
   * @default "" */
  on_equip?: string;
  /** Event to execute when the slot is changed to an empty item.
   * @default "" */
  on_unequip?: string;
  /** The equipment slot to monitor for changes.
   * @default "slot.weapon.mainhand" */
  slot?: "slot.armor.body" | "slot.armor.chest" | "slot.armor.feet" | "slot.armor.head" | "slot.armor.legs" | "slot.weapon.mainhand" | "slot.weapon.offhand";
};
export type EntityMinecraftPushableByEntity = {
  /** Defines how this entity behaves when pushed by another entity. The first preset whose "filter" conditions are met will be applied; if none match, a default configuration is used instead.
  
  Sample values:
  • boat: [{"filters":{"all_of":[{"test":"is_family","sub... */
  presets?: EntityPushablebyentitypreset[];
};
export type EntityPushablebyentitypreset = {
  /** Conditions that must be met for this preset to be applied. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** Multiplier applied to the pushing entity's movement speed to determine kick force. Only used when push_mode is "ball".
   * @default 2 */
  kick_speed_scale?: number;
  /** Maximum horizontal distance between the center of the pushed entity and the collision of the pushing entity for push forces to be applied. Entities further apart than this will not push each other.
   * @default 3.4028234663852886e+38 */
  max_distance?: number;
  /** Maximum speed the entity can be pushed back at, regardless of how fast the pushing entity is moving. Only used when push_mode is "ball".
   * @default 0.5 */
  max_kick_speed?: number;
  /** Minimum horizontal distance between the centers of the two entities for push forces to be applied. Entities closer than this will not push each other.
   * @default 0.009999999776482582 */
  min_distance?: number;
  /** Minimum speed the the entity will be pushed back at, regardless of how slowly the pushing entity is moving. Only used when push_mode is "ball".
   * @default 0 */
  min_kick_speed?: number;
  /** If the "pushed_by_player" sound should be played when the entity is pushed by any other entity (despite the sound name).
   * @default false */
  play_sound?: boolean;
  /** Cooldown in seconds between sounds. A lower number results in more sounds.
   * @default 0.20000000298023224 */
  play_sound_cooldown_in_seconds?: number;
  /** Minimum change of velocity needed to trigger the push sound. A lower value means higher sensitivity.
   * @default 0.20000000298023224 */
  play_sound_impulse_threshold?: number;
  /** Defines the type of push vector calculation applied to the entity:
  - "none": The entity cannot be pushed.
  - "default": Standard push calculations used by most entities.
  - "legacy_boat": Legacy push calculations historically used by boats. Includes dampened forces and sneak-based cancellation.
  - "legacy_minecart": Legacy push calculations historically used by minecarts. Includes alignment-based collision handling and velocity averaging.- "ball": Push calculation resulting in a behavior similar to kicking a ball. The entity is propelled in the direction of the pusher’s movement, with force scaled by their speed.
   * @default "default" */
  push_mode?: "ball" | "default" | "legacy_boat" | "legacy_minecart" | "none";
  /** Scales how much push force this entity applies to the other entity when colliding. A value of 1.0 applies full force, 0.5 applies half.
   * @default 1 */
  push_scale_other?: number;
  /** Scales how much this entity pushes itself away when colliding with another entity. A value of 1.0 applies full force, 0.5 applies half.
   * @default 1 */
  push_scale_self?: number;
  /** When true, entities will not push each other unless their collision boxes overlap.
   * @default true */
  require_collision_overlap?: boolean;
  /** Multiplier applied to the push strength. Higher values result in stronger pushes.
   * @default 0.05000000074505806 */
  strength_multiplier?: number;
  /** Multiplier for the upward force applied when the entity is pushed while on the ground. A value of 0 keeps the entity flat. Only used when push_mode is "ball".
   * @default 0.30000001192092896 */
  vertical_kick_multiplier?: number;
};
export type EntityMinecraftSpawnOnDeath = {
  /** Additional random range of entities to spawn, defaults to 0, 0 when not set */
  additional_spawn_range?: number | [number, number] | Intrange;
  /** What entity to spawn, defaults to owning entity when not set
   * @default "self" */
  entity_to_spawn?: string;
  /** Conditions that need to be met for the behavior to start. */
  filters?: ({
      /** The domain the test should be performed in. */
      domain?: Record<string, unknown>;
      /** The comparison to apply with 'value'. */
      operator?: Record<string, unknown>;
      /** The subject of this filter test. */
      subject?: Record<string, unknown>;
      /** The name of the test to apply. */
      test?: string;
      /** The value being compared with the test. */
      value?: Record<string, unknown>;
    }) | Record<string, unknown>;
  /** If true, the entity will inherit the name of the parent entity, defaults to true when not set
   * @default true */
  inherit_parent_name?: boolean;
  /** How many entities to spawn, defaults to 1 when not set
   * @default 1 */
  spawn_amount?: number;
  /** Spawn method. born, spawned, or summoned, defaults to spawned when not set
   * @default "spawned" */
  spawn_method?: string;
};

/** コンポーネント名と、その中身の型 */
export interface EntityComponents {
  /** Minecraft Absorption */
  "minecraft:absorption": Record<string, unknown>;
  /** Adds a rider to the entity. */
  "minecraft:addrider": EntityMinecraftAddrider;
  /** Allows an entity to ignore attackable targets for a given duration */
  "minecraft:admire_item": EntityMinecraftAdmireItem;
  /** Adds a timer for the entity to grow up. It can be accelerated by giving the entity the items it likes as defined by feed_items. */
  "minecraft:ageable": EntityMinecraftAgeable;
  /** Delay for an entity playing its sound */
  "minecraft:ambient_sound_interval": EntityMinecraftAmbientSoundInterval;
  /** Compels the entity to track anger towards a set of nuisances. */
  "minecraft:anger_level": EntityMinecraftAngerLevel;
  /** Defines an entity's 'angry' state using a timer. */
  "minecraft:angry": EntityMinecraftAngry;
  /** Allows an entity to break doors, assuming that that flags set up for the component to use in navigation. */
  "minecraft:annotation.break_door": EntityMinecraftAnnotationBreakDoor;
  /** Allows the entity to open doors. */
  "minecraft:annotation.open_door": EntityMinecraftAnnotationOpenDoor;
  /** A component that does damage to entities that get within range. */
  "minecraft:area_attack": EntityMinecraftAreaAttack;
  /** Defines an entity's melee attack damage and any additional status effects applied on hit. Typical damage values range from 3 (zombie, creeper) to 7-21 (iron golem). */
  "minecraft:attack": EntityMinecraftAttack;
  /** Adds a cooldown to an entity. The intention of this cooldown is to be used to prevent the entity from attempting to acquire new attack targets. */
  "minecraft:attack_cooldown": EntityMinecraftAttackCooldown;
  /** Specifies how much damage is dealt by the entity when it attacks. */
  "minecraft:attack_damage": EntityMinecraftAttackDamage;
  /** Minecraft Balloon */
  "minecraft:balloon": Record<string, unknown>;
  /** Allows this entity to have a balloon attached and defines the conditions and events for this entity when is ballooned. */
  "minecraft:balloonable": EntityMinecraftBalloonable;
  /** Enables the component to drop an item as a barter exchange. */
  "minecraft:barter": EntityMinecraftBarter;
  /** Enables the mob to admire items that have been configured as admirable. */
  "minecraft:behavior.admire_item": EntityMinecraftBehaviorAdmireItem;
  /** Enables the mob to barter for items that have been configured as barter currency. Must be used in combination with the barter component */
  "minecraft:behavior.barter": EntityMinecraftBehaviorBarter;
  /** Allows this mob to look at and follow the player that holds food they like. */
  "minecraft:behavior.beg": EntityMinecraftBehaviorBeg;
  /** Allows this mob to break doors. */
  "minecraft:behavior.break_door": EntityMinecraftBehaviorBreakDoor;
  /** Allows this mob to breed with other mobs. */
  "minecraft:behavior.breed": EntityMinecraftBehaviorBreed;
  /** Allows the mob to target another mob that hurts an entity it trusts. */
  "minecraft:behavior.defend_trusted_target": EntityMinecraftBehaviorDefendTrustedTarget;
  /** Allows the mob to open and close doors. */
  "minecraft:behavior.door_interact": EntityMinecraftBehaviorDoorInteract;
  /** Allows the dragon to go out with glory. This controls the Ender Dragon's death animation. */
  "minecraft:behavior.dragondeath": EntityMinecraftBehaviorDragondeath;
  /** Allows the Dragon to fly around in a circle around the center podium. */
  "minecraft:behavior.dragonholdingpattern": EntityMinecraftBehaviorDragonholdingpattern;
  /** Allows the Dragon to stop flying and transition into perching mode. */
  "minecraft:behavior.dragonlanding": EntityMinecraftBehaviorDragonlanding;
  /** Allows the dragon to look around for a player to attack while in perch mode. */
  "minecraft:behavior.dragonscanning": EntityMinecraftBehaviorDragonscanning;
  /** Allows the dragon to leave perch mode and go back to flying around. */
  "minecraft:behavior.dragontakeoff": EntityMinecraftBehaviorDragontakeoff;
  /** Allows the mob to drink potions based on specified environment conditions. */
  "minecraft:behavior.drink_potion": EntityMinecraftBehaviorDrinkPotion;
  /** If the mob is carrying a food item, the mob will eat it and the effects will be applied to the mob. */
  "minecraft:behavior.eat_carried_item": EntityMinecraftBehaviorEatCarriedItem;
  /** Allows the enderman to drop a block they are carrying. */
  "minecraft:behavior.enderman_leave_block": EntityMinecraftBehaviorEndermanLeaveBlock;
  /** Allows the enderman to take a block and carry it around. */
  "minecraft:behavior.enderman_take_block": EntityMinecraftBehaviorEndermanTakeBlock;
  /** Allows the mob to seek shade. */
  "minecraft:behavior.find_cover": EntityMinecraftBehaviorFindCover;
  /** Allows the mob to look around for another mob to ride atop it. */
  "minecraft:behavior.find_mount": EntityMinecraftBehaviorFindMount;
  /** Allows the mob to move towards the nearest underwater ruin or shipwreck. */
  "minecraft:behavior.find_underwater_treasure": EntityMinecraftBehaviorFindUnderwaterTreasure;
  /** Allows the mob to run away from direct sunlight and seek shade. */
  "minecraft:behavior.flee_sun": EntityMinecraftBehaviorFleeSun;
  /** Allows the mob to stay afloat while swimming. Passengers will be kicked out the moment the mob's head goes underwater, which may not happen for tall mobs. */
  "minecraft:behavior.float": EntityMinecraftBehaviorFloat;
  /** Allows a mob to be tempted by a player holding a specific item. Uses point-to-point movement. Designed for mobs that are floating (e.g. use the "minecraft:navigation.float" component). */
  "minecraft:behavior.float_tempt": EntityMinecraftBehaviorFloatTempt;
  /** Allows the mob to float around like the Ghast. */
  "minecraft:behavior.float_wander": EntityMinecraftBehaviorFloatWander;
  /** Allows the mob to follow mobs that are in a caravan. */
  "minecraft:behavior.follow_caravan": EntityMinecraftBehaviorFollowCaravan;
  /** Allows the mob to follow other mobs. */
  "minecraft:behavior.follow_mob": EntityMinecraftBehaviorFollowMob;
  /** Allows a mob to follow the player that owns it. */
  "minecraft:behavior.follow_owner": EntityMinecraftBehaviorFollowOwner;
  /** Allows the mob to follow their parent around. */
  "minecraft:behavior.follow_parent": EntityMinecraftBehaviorFollowParent;
  /** Allows mob to move towards its current target captain. */
  "minecraft:behavior.follow_target_captain": EntityMinecraftBehaviorFollowTargetCaptain;
  /** Allows a mob with the hide component to attempt to move to - and hide at - an owned or nearby POI. */
  "minecraft:behavior.hide": EntityMinecraftBehaviorHide;
  /** Compels an entity to stop at their current location, turn to face a mob they are targeting, and react with an event. */
  "minecraft:behavior.hold_ground": EntityMinecraftBehaviorHoldGround;
  /** Allows the mob to hover in place. */
  "minecraft:behavior.hover": EntityMinecraftBehaviorHover;
  /** Allows the mob to target another mob that hurts them. */
  "minecraft:behavior.hurt_by_target": EntityMinecraftBehaviorHurtByTarget;
  /** Allows the mob to inspect bookshelves. */
  "minecraft:behavior.inspect_bookshelf": EntityMinecraftBehaviorInspectBookshelf;
  /** Allows mobs to lay down at times */
  "minecraft:behavior.lay_down": EntityMinecraftBehaviorLayDown;
  /** Allows the mob to lay an egg block on certain types of blocks if the mob is pregnant. */
  "minecraft:behavior.lay_egg": EntityMinecraftBehaviorLayEgg;
  /** Allows monsters to jump at and attack their target. Can only be used by hostile mobs. */
  "minecraft:behavior.leap_at_target": EntityMinecraftBehaviorLeapAtTarget;
  /** Compels an entity to look at a specific entity by rotating the `head` bone pose within a set limit. */
  "minecraft:behavior.look_at_entity": EntityMinecraftBehaviorLookAtEntity;
  /** Compels an entity to look at the player by rotating the `head` bone pose within a set limit. */
  "minecraft:behavior.look_at_player": EntityMinecraftBehaviorLookAtPlayer;
  /** Compels an entity to look at the target by rotating the head bone pose within a set limit. */
  "minecraft:behavior.look_at_target": EntityMinecraftBehaviorLookAtTarget;
  /** Compels an entity to look at the player that is currently trading with the entity. */
  "minecraft:behavior.look_at_trading_player": EntityMinecraftBehaviorLookAtTradingPlayer;
  /** Allows the villager to look for a mate to spawn other villagers with. */
  "minecraft:behavior.make_love": EntityMinecraftBehaviorMakeLove;
  /** Allows an entity to go to the village bell and mingle with other entities */
  "minecraft:behavior.mingle": EntityMinecraftBehaviorMingle;
  /** Allows the mob to move around on its own while mounted seeking a target to attack. Also will allow an entity to target another entity for an attack. */
  "minecraft:behavior.mount_pathing": EntityMinecraftBehaviorMountPathing;
  /** Can only be used by Villagers. Allows the villagers to create paths around the village. */
  "minecraft:behavior.move_through_village": EntityMinecraftBehaviorMoveThroughVillage;
  /** Allows mob to move towards a block. */
  "minecraft:behavior.move_to_block": EntityMinecraftBehaviorMoveToBlock;
  /** Allows the mob to move back onto land when in water. */
  "minecraft:behavior.move_to_land": EntityMinecraftBehaviorMoveToLand;
  /** Allows the mob to move back into lava when on land. This behavior has been replaced by minecraft:behavior.move_to_liquid. */
  "minecraft:behavior.move_to_lava": EntityMinecraftBehaviorMoveToLava;
  /** Allows the mob to move into a liquid when on land. */
  "minecraft:behavior.move_to_liquid": EntityMinecraftBehaviorMoveToLiquid;
  /** Allows the mob to move to a POI if able to */
  "minecraft:behavior.move_to_poi": EntityMinecraftBehaviorMoveToPoi;
  /** Allows mob to move towards a random block. */
  "minecraft:behavior.move_to_random_block": EntityMinecraftBehaviorMoveToRandomBlock;
  /** Allows the mob to move into a random location within a village. */
  "minecraft:behavior.move_to_village": EntityMinecraftBehaviorMoveToVillage;
  /** Allows the mob to move back into water when on land. */
  "minecraft:behavior.move_to_water": EntityMinecraftBehaviorMoveToWater;
  /** Allows mob to move towards its current target. */
  "minecraft:behavior.move_towards_target": EntityMinecraftBehaviorMoveTowardsTarget;
  /** Allows mobs to occassionally stop and take a nap under certain conditions. */
  "minecraft:behavior.nap": EntityMinecraftBehaviorNap;
  /** Allows an entity to attack the closest target within a given subset of specific target types. */
  "minecraft:behavior.nearest_attackable_target": EntityMinecraftBehaviorNearestAttackableTarget;
  /** Allows the mob to check for and pursue the nearest valid target. */
  "minecraft:behavior.nearest_prioritized_attackable_target": EntityMinecraftBehaviorNearestPrioritizedAttackableTarget;
  /** Allows to mob to be able to sit in place like the ocelot. */
  "minecraft:behavior.ocelot_sit_on_block": EntityMinecraftBehaviorOcelotSitOnBlock;
  /** Allows the mob to open doors. Requires the mob to be able to path through doors, otherwise the mob won't even want to try opening them. */
  "minecraft:behavior.open_door": EntityMinecraftBehaviorOpenDoor;
  /** Allows the mob to target another mob that hurts their owner. */
  "minecraft:behavior.owner_hurt_by_target": EntityMinecraftBehaviorOwnerHurtByTarget;
  /** Allows the mob to target a mob that is hurt by their owner. */
  "minecraft:behavior.owner_hurt_target": EntityMinecraftBehaviorOwnerHurtTarget;
  /** Allows the mob to enter the panic state, which makes it run around and away from the damage source that made it enter this state. */
  "minecraft:behavior.panic": EntityMinecraftBehaviorPanic;
  /** Allows the pet mob to move onto a bed with its owner while sleeping. */
  "minecraft:behavior.pet_sleep_with_owner": EntityMinecraftBehaviorPetSleepWithOwner;
  /** Allows the mob to pick up items on the ground. */
  "minecraft:behavior.pickup_items": EntityMinecraftBehaviorPickupItems;
  /** Allows the mob to be ridden by the player after being tamed. */
  "minecraft:behavior.player_ride_tamed": EntityMinecraftBehaviorPlayerRideTamed;
  /** Allows the mob to eat/raid crops out of farms until they are full. */
  "minecraft:behavior.raid_garden": EntityMinecraftBehaviorRaidGarden;
  /** Allows the mob to randomly break surface of the water. */
  "minecraft:behavior.random_breach": EntityMinecraftBehaviorRandomBreach;
  /** Allows a mob to randomly fly around. */
  "minecraft:behavior.random_fly": EntityMinecraftBehaviorRandomFly;
  /** Allows the mob to hover around randomly, close to the surface. */
  "minecraft:behavior.random_hover": EntityMinecraftBehaviorRandomHover;
  /** Allows the mob to randomly look around. */
  "minecraft:behavior.random_look_around": EntityMinecraftBehaviorRandomLookAround;
  /** Allows the mob to randomly sit and look around for a duration. Note: Must have a sitting animation set up to use this. */
  "minecraft:behavior.random_look_around_and_sit": EntityMinecraftBehaviorRandomLookAroundAndSit;
  /** Allows the mob to randomly sit for a duration. */
  "minecraft:behavior.random_sitting": EntityMinecraftBehaviorRandomSitting;
  /** Allows a mob to randomly stroll around. */
  "minecraft:behavior.random_stroll": EntityMinecraftBehaviorRandomStroll;
  /** Allows an entity to randomly move through water */
  "minecraft:behavior.random_swim": EntityMinecraftBehaviorRandomSwim;
  /** Allows the villager to stop so another villager can breed with it. Can only be used by a Villager. */
  "minecraft:behavior.receive_love": EntityMinecraftBehaviorReceiveLove;
  /** Allows the mob to stay indoors during night time. */
  "minecraft:behavior.restrict_open_door": EntityMinecraftBehaviorRestrictOpenDoor;
  /** Allows the mob to automatically start avoiding the sun when its a clear day out. */
  "minecraft:behavior.restrict_sun": EntityMinecraftBehaviorRestrictSun;
  /** Allows the mob to stay at a certain level when in liquid. */
  "minecraft:behavior.rise_to_liquid_level": EntityMinecraftBehaviorRiseToLiquidLevel;
  /** This allows the mob to roll forward. */
  "minecraft:behavior.roll": EntityMinecraftBehaviorRoll;
  /** Allows the mob to run around aimlessly. */
  "minecraft:behavior.run_around_like_crazy": EntityMinecraftBehaviorRunAroundLikeCrazy;
  /** Allows the mob to become scared when the weather outside is thundering. */
  "minecraft:behavior.scared": EntityMinecraftBehaviorScared;
  /** Allows the mob to send an event to another mob. */
  "minecraft:behavior.send_event": EntityMinecraftBehaviorSendEvent;
  /** Allows the mob to give items it has to others. */
  "minecraft:behavior.share_items": EntityMinecraftBehaviorShareItems;
  /** Allows the mob to go into stone blocks like Silverfish do. */
  "minecraft:behavior.silverfish_merge_with_stone": EntityMinecraftBehaviorSilverfishMergeWithStone;
  /** Allows the mob to alert mobs in nearby blocks to come out. */
  "minecraft:behavior.silverfish_wake_up_friends": EntityMinecraftBehaviorSilverfishWakeUpFriends;
  /** Allows Equine mobs to be Horse Traps and be triggered like them, spawning a lightning bolt and a bunch of horses when a player is nearby. Can only be used by Horses, Mules, Donkeys and Skeleton Horses. */
  "minecraft:behavior.skeleton_horse_trap": EntityMinecraftBehaviorSkeletonHorseTrap;
  /** Allows mobs that own a bed to in a village to move to and sleep in it. */
  "minecraft:behavior.sleep": EntityMinecraftBehaviorSleep;
  /** Allows the mob to take a load off and snack on food that it found nearby. */
  "minecraft:behavior.snacking": EntityMinecraftBehaviorSnacking;
  /** Allows the mob to sneeze, causing it to drop items and affect nearby mobs. */
  "minecraft:behavior.sneeze": EntityMinecraftBehaviorSneeze;
  /** Allows the squid to dive down in water. */
  "minecraft:behavior.squid_dive": EntityMinecraftBehaviorSquidDive;
  /** Allows the squid to swim away. */
  "minecraft:behavior.squid_flee": EntityMinecraftBehaviorSquidFlee;
  /** Allows the squid to swim in place idly. */
  "minecraft:behavior.squid_idle": EntityMinecraftBehaviorSquidIdle;
  /** Allows the squid to move away from ground blocks and back to water. */
  "minecraft:behavior.squid_move_away_from_ground": EntityMinecraftBehaviorSquidMoveAwayFromGround;
  /** Allows the squid to stick to the ground when outside water. */
  "minecraft:behavior.squid_out_of_water": EntityMinecraftBehaviorSquidOutOfWater;
  /** Allows a mob to stalk a target, then once within range pounce onto a target, on success the target will be attacked dealing damage defined by the attack component. On failure, the mob will risk getting stuck */
  "minecraft:behavior.stalk_and_pounce_on_target": EntityMinecraftBehaviorStalkAndPounceOnTarget;
  /** Allows the mob to stay put while it is in a sitting state instead of doing something else. */
  "minecraft:behavior.stay_while_sitting": EntityMinecraftBehaviorStayWhileSitting;
  /** Allows this mob to stomp turtle eggs */
  "minecraft:behavior.stomp_turtle_egg": EntityMinecraftBehaviorStompTurtleEgg;
  /** Allows the mob to move into a random location within a village within the search range. */
  "minecraft:behavior.stroll_towards_village": EntityMinecraftBehaviorStrollTowardsVillage;
  /** Allows the mob to attack the player by summoning other entities. */
  "minecraft:behavior.summon_entity": EntityMinecraftBehaviorSummonEntity;
  /** Allows the creeper to swell up when a player is nearby. It can only be used by Creepers. */
  "minecraft:behavior.swell": EntityMinecraftBehaviorSwell;
  /** Allows the mob to target another mob when it is pushed by that mob. */
  "minecraft:behavior.target_when_pushed": EntityMinecraftBehaviorTargetWhenPushed;
  /** Allows a mob to be tempted by a player holding a specific item. Uses pathfinding for movement. */
  "minecraft:behavior.tempt": EntityMinecraftBehaviorTempt;
  /** Allows the mob to look at a player that is holding a tradable item. */
  "minecraft:behavior.trade_interest": EntityMinecraftBehaviorTradeInterest;
  /** Allows the mob to target the same entity its owner is targeting. */
  "minecraft:behavior.vex_copy_owner_target": EntityMinecraftBehaviorVexCopyOwnerTarget;
  /** Allows the mob to move around randomly like the Vex. */
  "minecraft:behavior.vex_random_move": EntityMinecraftBehaviorVexRandomMove;
  /** Allows the wither to launch random attacks. */
  "minecraft:behavior.wither_random_attack_pos_goal": EntityMinecraftBehaviorWitherRandomAttackPosGoal;
  /** Allows the wither to focus its attacks on whichever mob has dealt the most damage to it. */
  "minecraft:behavior.wither_target_highest_damage": EntityMinecraftBehaviorWitherTargetHighestDamage;
  /** Allows the player to detect and manuever on the scaffolding block. */
  "minecraft:block_climber": EntityMinecraftBlockClimber;
  /** Fires off a specified event when a block in the block list is broken within the sensor range. */
  "minecraft:block_sensor": EntityMinecraftBlockSensor;
  /** Causes the entity's body rotation to match the one of their head.
  Does not override the "minecraft:body_rotation_blocked" component. */
  "minecraft:body_rotation_always_follows_head": EntityMinecraftBodyRotationAlwaysFollowsHead;
  /** When set, the entity will no longer visually rotate their body to match their facing direction. */
  "minecraft:body_rotation_blocked": EntityMinecraftBodyRotationBlocked;
  /** Defines the conditions and behavior of a rideable entity's boost. */
  "minecraft:boostable": EntityMinecraftBoostable;
  /** Defines the current state of the boss for updating the boss HUD. */
  "minecraft:boss": EntityMinecraftBoss;
  /** Specifies the blocks that the entity can break as it moves around. */
  "minecraft:break_blocks": EntityMinecraftBreakBlocks;
  /** Defines what blocks this entity can breathe in and gives them the ability to suffocate. */
  "minecraft:breathable": EntityMinecraftBreathable;
  /** Allows an entity to establish a way to get into the love state used for breeding. */
  "minecraft:breedable": EntityMinecraftBreedable;
  /** Defines the way an entity can get into the 'bribed' state. */
  "minecraft:bribeable": EntityMinecraftBribeable;
  /** Minecraft Bucketable */
  "minecraft:bucketable": Record<string, unknown>;
  /** Enables an entity to float on the specified liquid blocks. */
  "minecraft:buoyant": EntityMinecraftBuoyant;
  /** Specifies that this entity takes fire damage when exposed to direct sunlight. This component is used by undead mobs like zombies, skeletons, and phantoms. The entity will catch fire when in sunlight unless it is wearing armor in the protection slot, standing in water, or in a shaded area. */
  "minecraft:burns_in_daylight": EntityMinecraftBurnsInDaylight;
  /** Allows an entity to climb ladders. */
  "minecraft:can_climb": EntityMinecraftCanClimb;
  /** Marks the entity as being able to fly, the pathfinder won't be restricted to paths where a solid block is required underneath it. */
  "minecraft:can_fly": EntityMinecraftCanFly;
  /** Specifies if an entity can join a raid. */
  "minecraft:can_join_raid": EntityMinecraftCanJoinRaid;
  /** Allows the entity to power jump like the Horse does in Vanilla. */
  "minecraft:can_power_jump": EntityMinecraftCanPowerJump;
  /** When set, blocks entities from attacking the owner entity unless they have the "minecraft:ignore_cannot_be_attacked" component. */
  "minecraft:cannot_be_attacked": EntityMinecraftCannotBeAttacked;
  /** Specifies hunt celebration behaviour. */
  "minecraft:celebrate_hunt": EntityMinecraftCelebrateHunt;
  /** Sets the width and height of the Entity's collision box. */
  "minecraft:collision_box": EntityMinecraftCollisionBox;
  /** Defines the entity's main color. */
  "minecraft:color": EntityMinecraftColor;
  /** Defines the entity's second texture color. */
  "minecraft:color2": EntityMinecraftColor2;
  /** Gives `Regeneration I` and removes `Mining Fatigue` from the mob that kills the entity's attack target. */
  "minecraft:combat_regeneration": EntityMinecraftCombatRegeneration;
  /** Defines the Conditional Spatial Update Bandwidth Optimizations of this entity. */
  "minecraft:conditional_bandwidth_optimization": EntityMinecraftConditionalBandwidthOptimization;
  /** List of hitboxes for melee and ranged hits against the entity. */
  "minecraft:custom_hit_test": EntityMinecraftCustomHitTest;
  /** Applies defined amount of damage to the entity at specified intervals. */
  "minecraft:damage_over_time": EntityMinecraftDamageOverTime;
  /** Defines what events to call when this entity is damaged by specific entities or items. */
  "minecraft:damage_sensor": EntityMinecraftDamageSensor;
  /** Ability for a rideable entity to dash. */
  "minecraft:dash": EntityMinecraftDash;
  /** Sets this entity's default head rotation angle. */
  "minecraft:default_look_angle": EntityMinecraftDefaultLookAngle;
  /** Despawns the Actor when the despawn rules or optional filters evaluate to true. */
  "minecraft:despawn": EntityMinecraftDespawn;
  /** Prevents the entity from changing dimension through portals. */
  "minecraft:dimension_bound": EntityMinecraftDimensionBound;
  /** Adds a timer for drying out that will count down and fire 'dried_out_event' or will stop as soon as the entity will get under rain or water and fire 'stopped_drying_out_event' */
  "minecraft:drying_out_timer": EntityMinecraftDryingOutTimer;
  /** Compels an entity to join and migrate between villages and other dwellings. */
  "minecraft:dweller": EntityMinecraftDweller;
  /** Defines this entity's ability to trade with players. */
  "minecraft:economy_trade_table": EntityMinecraftEconomyTradeTable;
  /** It defines to which armor slot an item equipped to 'minecraft:equippable''s second slot should be equipped to. It is automatically applied to all entities for worlds with a version greater than or equal to 1.21.10. For older worlds, 'slot.armor.torso' will be used. It is strongly advised not to explicitly use this component, as no backwards compatibility for it will be provided. */
  "minecraft:entity_armor_equipment_slot_mapping": EntityMinecraftEntityArmorEquipmentSlotMapping;
  /** A component that owns multiple subsensors, each one firing an event when a set of conditions are met by other entities within the defined range. */
  "minecraft:entity_sensor": EntityMinecraftEntitySensor;
  /** Creates a trigger based on environment conditions. */
  "minecraft:environment_sensor": EntityMinecraftEnvironmentSensor;
  /** The entity puts on the desired equipment. */
  "minecraft:equip_item": EntityMinecraftEquipItem;
  /** Sets the Equipment table to use for this Entity. */
  "minecraft:equipment": EntityMinecraftEquipment;
  /** Defines an entity's behavior for having items equipped to it. */
  "minecraft:equippable": EntityMinecraftEquippable;
  /** Defines how much exhaustion each player action should take. */
  "minecraft:exhaustion_values": EntityMinecraftExhaustionValues;
  /** . */
  "minecraft:experience_reward": EntityMinecraftExperienceReward;
  /** Defines how the entity explodes. */
  "minecraft:explode": EntityMinecraftExplode;
  /** Sets that this entity doesn't take damage from fire. Can be an empty object {} or boolean true. */
  "minecraft:fire_immune": EntityMinecraftFireImmune | boolean;
  /** Sets that this entity can float in liquid blocks. */
  "minecraft:floats_in_liquid": EntityMinecraftFloatsInLiquid;
  /** Allows entities to flock in groups in water or not. */
  "minecraft:flocking": EntityMinecraftFlocking;
  /** Speed in Blocks that this entity flies at. */
  "minecraft:flying_speed": EntityMinecraftFlyingSpeed;
  /** Defines the maximum range, in blocks, that a mob will pursue a target. This affects AI behaviors like chasing players or attacking. */
  "minecraft:follow_range": EntityMinecraftFollowRange;
  /** Defines how much friction affects this entity. */
  "minecraft:friction_modifier": EntityMinecraftFrictionModifier;
  /** Allows an entity to emit `entityMove`, `swim` and `flap` game events, depending on the block the entity is moving through. It is added by default to every mob. Add it again to override its behavior. */
  "minecraft:game_event_movement_tracking": EntityMinecraftGameEventMovementTracking;
  /** Defines the way a mob's genes and alleles are passed on to its offspring, and how those traits manifest in the child. Compatible parent genes are crossed together, the alleles are handed down from the parents to the child, and any matching genetic variants fire off JSON events to modify the child and express the traits. */
  "minecraft:genetics": EntityMinecraftGenetics;
  /** Defines sets of items that can be used to trigger events when used on this entity. The item will also be taken and placed in the entity's inventory. */
  "minecraft:giveable": EntityMinecraftGiveable;
  /** Sets the offset from the ground that the entity is actually at. */
  "minecraft:ground_offset": EntityMinecraftGroundOffset;
  /** Keeps track of entity group size in the given radius. */
  "minecraft:group_size": EntityMinecraftGroupSize;
  /** Could increase crop growth when entity walks over crop */
  "minecraft:grows_crop": EntityMinecraftGrowsCrop;
  /** How entities heal */
  "minecraft:healable": EntityMinecraftHealable;
  /** Defines the health pool for an entity, measured in health points (1 point = half a heart). Typical values: cow (10), zombie (20), iron golem (100), wither (600). */
  "minecraft:health": EntityMinecraftHealth;
  /** Defines the entity's heartbeat. */
  "minecraft:heartbeat": EntityMinecraftHeartbeat;
  /** Moves to and hides at their owned POI or the closest nearby. */
  "minecraft:hide": EntityMinecraftHide;
  /** Saves a home position for when the entity is spawned. This component allows entities like bees to remember and return to a specific location such as a hive or nest. */
  "minecraft:home": EntityMinecraftHome;
  /** Determines the jump height for a horse or similar entity, like a donkey. */
  "minecraft:horse.jump_strength": EntityMinecraftHorseJumpStrength;
  /** Defines a set of conditions under which an entity should take damage. */
  "minecraft:hurt_on_condition": EntityMinecraftHurtOnCondition;
  /** Allows the owner entity to ignore the "minecraft:cannot_be_attacked" component on entities that fulfill the filter. */
  "minecraft:ignore_cannot_be_attacked": EntityMinecraftIgnoreCannotBeAttacked;
  /** When configured as a rideable entity, the entity will be controlled using WASD controls and mouse to move in three dimensions. */
  "minecraft:input_air_controlled": EntityMinecraftInputAirControlled;
  /** When configured as a rideable entity, the entity will be controlled using WASD controls. Beginning with 1.19.50 the default auto step height for rideable entities is half a block. Consider adding the "minecraft:variable_max_auto_step" component to increase it. */
  "minecraft:input_ground_controlled": EntityMinecraftInputGroundControlled;
  /** Verifies whether the entity is inside any of the listed blocks. */
  "minecraft:inside_block_notifier": EntityMinecraftInsideBlockNotifier;
  /** Adds a timer since last rested to see if phantoms should spawn. */
  "minecraft:insomnia": EntityMinecraftInsomnia;
  /** Despawns the Actor immediately. */
  "minecraft:instant_despawn": EntityMinecraftInstantDespawn;
  /** Defines interactions with this entity. */
  "minecraft:interact": EntityMinecraftInteract;
  /** Defines this entity's inventory properties. */
  "minecraft:inventory": EntityMinecraftInventory;
  /** Sets that this entity is a baby. This is used to set the is_baby value for use in query functions like Molang and Filters. */
  "minecraft:is_baby": EntityMinecraftIsBaby;
  /** Sets that this entity is charged. This is used to set the is_charged value for use in query functions like Molang and Filters. */
  "minecraft:is_charged": EntityMinecraftIsCharged;
  /** Sets that this entity is currently carrying a chest. */
  "minecraft:is_chested": EntityMinecraftIsChested;
  /** Allows other mobs to have vertical and horizontal collisions with this mob. For a collision to occur, both mobs must have a "minecraft:collision_box" component. This component can only be used on mobs and enables collisions exclusively between mobs.
  Please note that this type of collision is unreliable for moving collidable mobs. It is recommended to use this component only in scenarios where the collidable mob remains stationary.
  Collidable behavior is closely related to stackable behavior. While the "minecraft:is_collidable" component governs how other mobs interact with the component's owner, the "minecraft:is_stackable" component describes how an entity interacts with others of its own kind. */
  "minecraft:is_collidable": EntityMinecraftIsCollidable;
  /** Allows dyes to be used on this entity to change its color. */
  "minecraft:is_dyeable": EntityMinecraftIsDyeable;
  /** The entity can hide from hostile mobs while invisible. */
  "minecraft:is_hidden_when_invisible": EntityMinecraftIsHiddenWhenInvisible;
  /** Sets that this entity is currently on fire. */
  "minecraft:is_ignited": EntityMinecraftIsIgnited;
  /** Sets that this entity is an Illager Captain. */
  "minecraft:is_illager_captain": EntityMinecraftIsIllagerCaptain;
  /** Sets that this entity is currently pregnant. */
  "minecraft:is_pregnant": EntityMinecraftIsPregnant;
  /** Sets that this entity is currently saddled. */
  "minecraft:is_saddled": EntityMinecraftIsSaddled;
  /** Sets that this entity is currently shaking. */
  "minecraft:is_shaking": EntityMinecraftIsShaking;
  /** Sets that this entity is currently sheared. */
  "minecraft:is_sheared": EntityMinecraftIsSheared;
  /** Allows instances of this entity to have vertical and horizontal collisions with each other. For a collision to occur, both instances must have a "minecraft:collision_box" component.
  Stackable behavior is closely related to collidable behavior. While the "minecraft:is_stackable" component describes how an entity interacts with others of its own kind, the "minecraft:is_collidable" component governs how other mobs interact with the component's owner. */
  "minecraft:is_stackable": EntityMinecraftIsStackable;
  /** Sets that this entity is currently stunned. */
  "minecraft:is_stunned": EntityMinecraftIsStunned;
  /** Sets that this entity is currently tamed. */
  "minecraft:is_tamed": EntityMinecraftIsTamed;
  /** Defines what items can be used to control this entity while ridden. */
  "minecraft:item_controllable": EntityMinecraftItemControllable;
  /** Determines that this entity is an item hopper. */
  "minecraft:item_hopper": EntityMinecraftItemHopper;
  /** Defines a dynamic type jump control that will change jump properties based on the speed modifier of the mob.Requires `minecraft:movement.skip` to be used. */
  "minecraft:jump.dynamic": EntityMinecraftJumpDynamic;
  /** Gives the entity the ability to jump. */
  "minecraft:jump.static": EntityMinecraftJumpStatic;
  /** Determines an entity's resistance to knockback from melee attacks. A value of 0.0 means no resistance, while 1.0 provides full immunity to knockback (like iron golems). */
  "minecraft:knockback_resistance": EntityMinecraftKnockbackResistance;
  /** Allows a custom movement speed across lava blocks. */
  "minecraft:lava_movement": EntityMinecraftLavaMovement;
  /** Describes how this mob can be leashed to other items */
  "minecraft:leashable": EntityMinecraftLeashable;
  /** Allows players to leash entities to this entity, retrieve entities already leashed to it, or free them using shears. For the last interaction to work, the leashed entities must have "can_be_cut" set to true in their "minecraft:leashable" component. */
  "minecraft:leashable_to": EntityMinecraftLeashableTo;
  /** Defines the behavior when another entity looks at the owner entity. */
  "minecraft:looked_at": EntityMinecraftLookedAt;
  /** Specifies the loot table that determines what items this entity drops upon death. The table path is relative to the behavior pack's root folder. */
  "minecraft:loot": EntityMinecraftLoot;
  /** Minecraft Luck */
  "minecraft:luck": Record<string, unknown>;
  /** Manages the entity's ability to trade. */
  "minecraft:managed_wandering_trader": EntityMinecraftManagedWanderingTrader;
  /** Mark Variant is typically used as an additional per-type way (besides `variant`) to express a different visual form of the same mob. */
  "minecraft:mark_variant": EntityMinecraftMarkVariant;
  /** A component that applies a mob effect to entities that get within range. */
  "minecraft:mob_effect": EntityMinecraftMobEffect;
  /** Entities with this component will have an immunity to the provided mob effects. */
  "minecraft:mob_effect_immunity": EntityMinecraftMobEffectImmunity;
  /** Defines the base movement speed of an entity. Typical values: creeper (0.2), cow (0.25), zombie baby (0.35). */
  "minecraft:movement": EntityMinecraftMovement;
  /** This move control allows the mob to swim in water and walk on land. */
  "minecraft:movement.amphibious": EntityMinecraftMovementAmphibious;
  /** This component accents the movement of an entity. */
  "minecraft:movement.basic": EntityMinecraftMovementBasic;
  /** This component can control how dolphins move, in a dolphin-esque style. */
  "minecraft:movement.dolphin": EntityMinecraftMovementDolphin;
  /** This move control causes the mob to fly. */
  "minecraft:movement.fly": EntityMinecraftMovementFly;
  /** This move control allows a mob to fly, swim, climb, etc. */
  "minecraft:movement.generic": EntityMinecraftMovementGeneric;
  /** This move control causes the mob to glide. */
  "minecraft:movement.glide": EntityMinecraftMovementGlide;
  /** This move control causes the mob to hover. */
  "minecraft:movement.hover": EntityMinecraftMovementHover;
  /** Move control that causes the mob to jump as it moves with a specified delay between jumps. */
  "minecraft:movement.jump": EntityMinecraftMovementJump;
  /** This move control causes the mob to hop as it moves. */
  "minecraft:movement.skip": EntityMinecraftMovementSkip;
  /** This move control causes the mob to sway side to side giving the impression it is swimming. */
  "minecraft:movement.sway": EntityMinecraftMovementSway;
  /** Sets the offset used to determine the next step distance for playing a movement sound. */
  "minecraft:movement_sound_distance_offset": EntityMinecraftMovementSoundDistanceOffset;
  /** Allows this entity to be named (e.g. using a name tag). */
  "minecraft:nameable": EntityMinecraftNameable;
  /** Allows this entity to generate paths that include vertical walls like the vanilla Spiders do. */
  "minecraft:navigation.climb": EntityMinecraftNavigationClimb;
  /** Allows this entity to generate paths by flying around the air like the regular Ghast. */
  "minecraft:navigation.float": EntityMinecraftNavigationFloat;
  /** Allows this entity to generate paths in the air like the vanilla Parrots do. */
  "minecraft:navigation.fly": EntityMinecraftNavigationFly;
  /** Allows this entity to generate paths by walking, swimming, flying and/or climbing around and jumping up and down a block. */
  "minecraft:navigation.generic": EntityMinecraftNavigationGeneric;
  /** Allows this entity to generate paths in the air like the vanilla Bees do. Keeps them from falling out of the skies and doing predictive movement. */
  "minecraft:navigation.hover": EntityMinecraftNavigationHover;
  /** Allows this entity to generate paths that include water. */
  "minecraft:navigation.swim": EntityMinecraftNavigationSwim;
  /** Walking style of the mob */
  "minecraft:navigation.walk": EntityMinecraftNavigationWalk;
  /** Minecraft Npc */
  "minecraft:npc": Record<string, unknown>;
  /** Adds a trigger to call on this entity's death. */
  "minecraft:on_death": EntityMinecraftOnDeath;
  /** Adds a trigger that will run when a nearby entity of the same type as this entity becomes Angry. */
  "minecraft:on_friendly_anger": EntityMinecraftOnFriendlyAnger;
  /** Adds a trigger to call when this entity takes damage. */
  "minecraft:on_hurt": EntityMinecraftOnHurt;
  /** Adds a trigger to call when this entity is attacked by the player. */
  "minecraft:on_hurt_by_player": EntityMinecraftOnHurtByPlayer;
  /** Adds a trigger to call when this entity is set on fire. */
  "minecraft:on_ignite": EntityMinecraftOnIgnite;
  /** Only usable by the Ender Dragon. Adds a trigger to call when this entity lands. */
  "minecraft:on_start_landing": EntityMinecraftOnStartLanding;
  /** Only usable by the Ender Dragon. Adds a trigger to call when this entity starts flying. */
  "minecraft:on_start_takeoff": EntityMinecraftOnStartTakeoff;
  /** Adds a trigger to call when this entity finds a target. */
  "minecraft:on_target_acquired": EntityMinecraftOnTargetAcquired;
  /** Adds a trigger to call when this entity loses the target it currently has. */
  "minecraft:on_target_escape": EntityMinecraftOnTargetEscape;
  /** A trigger when a mob's tamed onwer wakes up. */
  "minecraft:on_wake_with_owner": EntityMinecraftOnWakeWithOwner;
  /** Defines the entity's 'out of control' state. */
  "minecraft:out_of_control": EntityMinecraftOutOfControl;
  /** Defines the entity's 'peek' behavior, defining the events that should be called during it. */
  "minecraft:peek": EntityMinecraftPeek;
  /** Defines whether an entity should be persistent in the game world. */
  "minecraft:persistent": EntityMinecraftPersistent;
  /** Defines physics properties of an actor, including if it is affected by gravity or if it collides with objects. */
  "minecraft:physics": EntityMinecraftPhysics;
  /** Defines the player's exhaustion level. */
  "minecraft:player.exhaustion": EntityMinecraftPlayerExhaustion;
  /** Defines how much experience each player action should take. */
  "minecraft:player.experience": EntityMinecraftPlayerExperience;
  /** Hunger Minecraft Player */
  "minecraft:player.hunger": Record<string, unknown>;
  /** Defines the player's level. */
  "minecraft:player.level": EntityMinecraftPlayerLevel;
  /** Defines the player's need for food. */
  "minecraft:player.saturation": EntityMinecraftPlayerSaturation;
  /** Specifies costing information for mobs that prefer to walk on preferred paths. */
  "minecraft:preferred_path": EntityMinecraftPreferredPath;
  /** Turns the entity into a projectile: a thrown or shot entity that flies along a ballistic arc and reacts when it impacts a block, a fluid, or another entity. */
  "minecraft:projectile": EntityMinecraftProjectile;
  /** Sets the distance through which the entity can push through. */
  "minecraft:push_through": EntityMinecraftPushThrough;
  /** Defines what can push an entity between other entities and pistons. */
  "minecraft:pushable": EntityMinecraftPushable;
  /** Attempts to trigger a raid at the entity's location. */
  "minecraft:raid_trigger": EntityMinecraftRaidTrigger;
  /** Defines the entity's movement on the rails. An entity with this component is only allowed to move on the rail. */
  "minecraft:rail_movement": EntityMinecraftRailMovement;
  /** Enables minecart-type entities to detect powered rails and respond to activation state changes. Triggers events when the entity passes over activated or deactivated rails, enabling custom minecart behaviors like launching at boosted speed, stopping at braking rails, or triggering special effects at detector rails. */
  "minecraft:rail_sensor": EntityMinecraftRailSensor;
  /** Defines the ravager's response to their melee attack being blocked. */
  "minecraft:ravager_blocked": EntityMinecraftRavagerBlocked;
  /** [EXPERIMENTAL] Allows an entity to reflect projectiles. */
  "minecraft:reflect_projectiles": EntityMinecraftReflectProjectiles;
  /** When set, the entity will render even when invisible. Appropriate rendering behavior can then be specified in the corresponding "minecraft:client_entity". */
  "minecraft:renders_when_invisible": EntityMinecraftRendersWhenInvisible;
  /** This entity can be ridden */
  "minecraft:rideable": EntityMinecraftRideable;
  /** Causes the entity to automatically rotate to align with the nearest cardinal direction based on its current facing direction.
  Combining this with the "minecraft:body_rotation_blocked" component will cause the entity's body to align with the nearest cardinal direction and remain fixed in that orientation, regardless of changes in its facing direction. */
  "minecraft:rotation_axis_aligned": EntityMinecraftRotationAxisAligned;
  /** Sets the entity's visual size multiplier. A value of 1.0 means normal size, 0.5 is half size (commonly used for baby mobs), and values above 1.0 make the entity larger. */
  "minecraft:scale": EntityMinecraftScale;
  /** Defines the entity's size interpolation based on the entity's age. */
  "minecraft:scale_by_age": EntityMinecraftScaleByAge;
  /** Fires off scheduled mob events at time of day events. */
  "minecraft:scheduler": EntityMinecraftScheduler;
  /** Defines a list of items the mob wants to share or pick up. Items can be configured with optional parameters to control pickup, sharing, and inventory behavior. */
  "minecraft:shareables": EntityMinecraftShareables;
  /** Defines the entity's ranged attack behavior. The "minecraft:behavior.ranged_attack" goal uses this component to determine which projectiles to shoot. */
  "minecraft:shooter": EntityMinecraftShooter;
  /** Defines the entity's 'sit' state. */
  "minecraft:sittable": EntityMinecraftSittable;
  /** Skin ID value. Can be used to differentiate skins, such as base skins for villagers. */
  "minecraft:skin_id": EntityMinecraftSkinId;
  /** Sets the entity's base volume for sound effects. */
  "minecraft:sound_volume": EntityMinecraftSoundVolume;
  /** Adds a timer after which this entity will spawn another entity or item (similar to vanilla's chicken's egg-laying behavior). */
  "minecraft:spawn_entity": EntityMinecraftSpawnEntity;
  /** Allows an entity to add or remove status effects from itself. Similarly to `addrider`, this component performs a one-time operation on the entity when added. Removing the component will not change the entity's current effects. Adding different versions of the component multiple times will perform each one in turn. Once the component has been added, it will not provide any further functionality. There is one exception to this behavior: if this component is present on a player, its effects will be re-applied every time the player enters the world. To avoid this, remove the component shortly after adding it, or add an empty component to replace it. */
  "minecraft:spell_effects": EntityMinecraftSpellEffects;
  /** Defines the entity's strength to carry items. */
  "minecraft:strength": EntityMinecraftStrength;
  /** Allows this entity to remember suspicious locations. */
  "minecraft:suspect_tracking": EntityMinecraftSuspectTracking;
  /** This entity can be tamed */
  "minecraft:tameable": EntityMinecraftTameable;
  /** Allows entities to flock in groups in water or not. */
  "minecraft:tamemount": EntityMinecraftTamemount;
  /** Defines the entity's range within which it can see or sense other entities to target them. */
  "minecraft:target_nearby_sensor": EntityMinecraftTargetNearbySensor;
  /** Defines an entity's teleporting behavior. */
  "minecraft:teleport": EntityMinecraftTeleport;
  /** Defines if the entity ticks the world and the radius around it to tick. */
  "minecraft:tick_world": EntityMinecraftTickWorld;
  /** Adds a timer after which an event will fire. */
  "minecraft:timer": EntityMinecraftTimer;
  /** Resupplies an entity's trade. */
  "minecraft:trade_resupply": EntityMinecraftTradeResupply;
  /** Defines this entity's ability to trade with players. */
  "minecraft:trade_table": EntityMinecraftTradeTable;
  /** Causes an entity to leave a trail of blocks as it moves about the world. */
  "minecraft:trail": EntityMinecraftTrail;
  /** Defines an entity's transformation from the current definition into another */
  "minecraft:transformation": EntityMinecraftTransformation;
  /** An entity with this component will NEVER persist, and forever disappear when unloaded. */
  "minecraft:transient": EntityMinecraftTransient;
  /** Allows this entity to trust multiple players. */
  "minecraft:trust": EntityMinecraftTrust;
  /** Defines the rules for a mob to trust players. */
  "minecraft:trusting": EntityMinecraftTrusting;
  /** Defines the family categories this entity belongs to. Type families are used by filters and other game systems to group entities (e.g., 'mob', 'monster', 'undead', 'zombie'). */
  "minecraft:type_family": EntityMinecraftTypeFamily;
  /** Defines the speed with which an entity can move through water. */
  "minecraft:underwater_movement": EntityMinecraftUnderwaterMovement;
  /** Entities with this component will have a maximum auto step height that is different depending on whether they are on a block that prevents jumping. Incompatible with "runtime_identifier": "minecraft:horse". */
  "minecraft:variable_max_auto_step": EntityMinecraftVariableMaxAutoStep;
  /** Variant is typically used as a per-type way to express a different visual form of the same mob. For example, for cats, variant is a number that defines the breed of cat. */
  "minecraft:variant": EntityMinecraftVariant;
  /** Vibrations emitted by an entity with this component will be ignored. */
  "minecraft:vibration_damper": EntityMinecraftVibrationDamper;
  /** Allows the entity to listen to vibration events. This is a largely-internal component, that is only supported on the Warden and Allay mobs. */
  "minecraft:vibration_listener": EntityMinecraftVibrationListener;
  /** Sets the speed multiplier for this entity's walk animation speed. */
  "minecraft:walk_animation_speed": EntityMinecraftWalkAnimationSpeed;
  /** Sets that this entity wants to become a jockey. */
  "minecraft:wants_jockey": EntityMinecraftWantsJockey;
  /** Customizes how the entity moves through water by adjusting drag coefficient. Lower values let entities glide through water easily like fish, while higher values create resistance for entities that struggle in water. Essential for aquatic mobs, boats, and any entity needing custom underwater physics. */
  "minecraft:water_movement": EntityMinecraftWaterMovement;
  /** Allows the wither to focus its attacks on whichever mob has dealt the most damage to it. */
  "minecraft:wither_target_highest_damage": EntityMinecraftWitherTargetHighestDamage;
  /** Minecraft Air Drag Modifier */
  "minecraft:air_drag_modifier": Record<string, unknown>;
  /** Defines how an entity applies knockback. */
  "minecraft:apply_knockback_rules": EntityMinecraftApplyKnockbackRules;
  /** Enables an aquatic mob to dash at its target with knockback; includes overshoot and cooldown settings. */
  "minecraft:behavior.aquatic_charge_attack": EntityMinecraftBehaviorAquaticChargeAttack;
  /** Allows this entity to avoid certain blocks. */
  "minecraft:behavior.avoid_block": EntityMinecraftBehaviorAvoidBlock;
  /** Allows the entity to run away from other entities that meet the criteria specified. */
  "minecraft:behavior.avoid_mob_type": EntityMinecraftBehaviorAvoidMobType;
  /** Allows this entity to celebrate surviving a raid by making celebration sounds and jumping. */
  "minecraft:behavior.celebrate": EntityMinecraftBehaviorCelebrate;
  /** Allows the player to trade with this mob. When the goal starts, it will stop the mob's navigation. */
  "minecraft:behavior.celebrate_survive": EntityMinecraftBehaviorCelebrateSurvive;
  /** Allows this entity to damage a target by using a running attack. */
  "minecraft:behavior.charge_attack": EntityMinecraftBehaviorChargeAttack;
  /** Allows an entity to charge and use their held item. */
  "minecraft:behavior.charge_held_item": EntityMinecraftBehaviorChargeHeldItem;
  /** Causes an entity to circle around an anchor point placed near a point or target. */
  "minecraft:behavior.circle_around_anchor": EntityMinecraftBehaviorCircleAroundAnchor;
  /** Allows the entity to be controlled by a player which is holding the item specified in "minecraft:item_controllable" component's "control_items" field (required). Also requires the "minecraft:movement" component, and the "minecraft:rideable" component. On every tick, the entity will attempt to rotate towards where the player is facing with the control item whilst simultaneously moving forward. */
  "minecraft:behavior.controlled_by_player": EntityMinecraftBehaviorControlledByPlayer;
  /** Allows the entity to croak at a random time interval with configurable conditions. */
  "minecraft:behavior.croak": EntityMinecraftBehaviorCroak;
  /** Allows the entity to stay in a village and defend the village from aggressors. If a player is in bad standing with the village this goal will cause the entity to attack the player regardless of filter conditions. */
  "minecraft:behavior.defend_village_target": EntityMinecraftBehaviorDefendVillageTarget;
  /** Allows an entity to attack, while also delaying the damage-dealt until a specific time in the attack animation. */
  "minecraft:behavior.delayed_attack": EntityMinecraftBehaviorDelayedAttack;
  /** Allows this entity to dig into the ground before despawning. */
  "minecraft:behavior.dig": EntityMinecraftBehaviorDig;
  /** Allows this entity to attack a player by charging at them. The player is chosen by the "minecraft:behavior.dragonscanning". Can only be used by the Ender Dragon. */
  "minecraft:behavior.dragonchargeplayer": EntityMinecraftBehaviorDragonchargeplayer;
  /** Allows this entity to use a flame-breath attack. Can only be used by the Ender Dragon. */
  "minecraft:behavior.dragonflaming": EntityMinecraftBehaviorDragonflaming;
  /** Allows this entity to fly around looking for a player to shoot fireballs at. Can only be used by the Ender Dragon. */
  "minecraft:behavior.dragonstrafeplayer": EntityMinecraftBehaviorDragonstrafeplayer;
  /** Allows the mob to drink milk based on specified environment conditions. */
  "minecraft:behavior.drink_milk": EntityMinecraftBehaviorDrinkMilk;
  /** Allows the entity to move toward a target, and drop an item near the target. This goal requires a "minecraft:navigation" to execute. */
  "minecraft:behavior.drop_item_for": EntityMinecraftBehaviorDropItemFor;
  /** Allows the entity to consume a block, replace the eaten block with another block, and trigger an event as a result. */
  "minecraft:behavior.eat_block": EntityMinecraftBehaviorEatBlock;
  /** Allows the entity to eat a specified Mob. */
  "minecraft:behavior.eat_mob": EntityMinecraftBehaviorEatMob;
  /** Allows this entity to emerge from the ground */
  "minecraft:behavior.emerge": EntityMinecraftBehaviorEmerge;
  /** The entity puts on the desired equipment. */
  "minecraft:behavior.equip_item": EntityMinecraftBehaviorEquipItem;
  /** Allows the entity to first travel to a random point on the outskirts of the village, and then explore random points within a small distance. This goal requires "minecraft:dweller" and "minecraft:navigation" to execute. */
  "minecraft:behavior.explore_outskirts": EntityMinecraftBehaviorExploreOutskirts;
  /** Allows the mob to search within an area for a growable crop block. If found, the mob will use any available fertilizer in their inventory on the crop. This goal will not execute if the mob does not have a fertilizer item in its inventory. */
  "minecraft:behavior.fertilize_farm_block": EntityMinecraftBehaviorFertilizeFarmBlock;
  /** Allows an entity to attack by firing a shot with a delay. Anchor and offset parameters of this component overrides the anchor and offset from projectile component. */
  "minecraft:behavior.fire_at_target": EntityMinecraftBehaviorFireAtTarget;
  /** Allows mob to move towards its target leader. */
  "minecraft:behavior.follow_target_leader": EntityMinecraftBehaviorFollowTargetLeader;
  /** The entity will attempt to toss the items from its inventory to a nearby recently played noteblock. */
  "minecraft:behavior.go_and_give_items_to_noteblock": EntityMinecraftBehaviorGoAndGiveItemsToNoteblock;
  /** The entity will attempt to toss the items from its inventory to its owner. */
  "minecraft:behavior.go_and_give_items_to_owner": EntityMinecraftBehaviorGoAndGiveItemsToOwner;
  /** Allows the mob to move back to the position they were spawned. */
  "minecraft:behavior.go_home": EntityMinecraftBehaviorGoHome;
  /** Allows this entity to use a laser beam attack. Can only be used by Guardians and Elder Guardians. */
  "minecraft:behavior.guardian_attack": EntityMinecraftBehaviorGuardianAttack;
  /** Allows the entity to search within an area for farmland with air above it. If found, the entity will replace the air block by planting a seed item from its inventory on the farmland block. This goal requires "minecraft:inventory" and "minecraft:navigation" to execute. This goal will not execute if the entity does not have an item in its inventory. */
  "minecraft:behavior.harvest_farm_block": EntityMinecraftBehaviorHarvestFarmBlock;
  /** Allows this entity to move towards a "suspicious" position based on data gathered in minecraft:suspect_tracking */
  "minecraft:behavior.investigate_suspicious_location": EntityMinecraftBehaviorInvestigateSuspiciousLocation;
  /** Allows an entity to jump around a target. */
  "minecraft:behavior.jump_around_target": EntityMinecraftBehaviorJumpAroundTarget;
  /** Allows an entity to jump to another random block. */
  "minecraft:behavior.jump_to_block": EntityMinecraftBehaviorJumpToBlock;
  /** Allows the mob to perform a damaging knockback that affects all nearby entities. */
  "minecraft:behavior.knockback_roar": EntityMinecraftBehaviorKnockbackRoar;
  /** Allows an entity to deal damage through a melee attack. */
  "minecraft:behavior.melee_attack": EntityMinecraftBehaviorMeleeAttack;
  /** Allows an entity to deal damage through a melee attack with reach calculations based on bounding boxes. */
  "minecraft:behavior.melee_box_attack": EntityMinecraftBehaviorMeleeBoxAttack;
  /** Allows an entity to move around a target.If the entity is too close(i.e.closer than destination range min and height difference limit) it will try to move away from its target.If the entity is too far away from its target it will try to move closer to a random position within the destination range.A randomized amount of those positions will be behind the target, and the spread can be tweaked with 'destination_pos_spread_degrees'. */
  "minecraft:behavior.move_around_target": EntityMinecraftBehaviorMoveAroundTarget;
  /** Allows this entity to move indoors. */
  "minecraft:behavior.move_indoors": EntityMinecraftBehaviorMoveIndoors;
  /** Allows this entity to move outdoors. */
  "minecraft:behavior.move_outdoors": EntityMinecraftBehaviorMoveOutdoors;
  /** Allows entities with the "minecraft:dweller" component to move toward their village area that the entity should be restricted to. */
  "minecraft:behavior.move_towards_dwelling_restriction": EntityMinecraftBehaviorMoveTowardsDwellingRestriction;
  /** Allows entities with a "minecraft:home" component to move towards their home position. If "restriction_radius" is set, entities will be able to run this behavior only if outside of it. */
  "minecraft:behavior.move_towards_home_restriction": EntityMinecraftBehaviorMoveTowardsHomeRestriction;
  /** Controls specific attack behavior for Ocelots. */
  "minecraft:behavior.ocelotattack": EntityMinecraftBehaviorOcelotattack;
  /** Allows the mob to offer a flower to another mob with the minecraft:take_flower behavior. */
  "minecraft:behavior.offer_flower": EntityMinecraftBehaviorOfferFlower;
  /** Allows the entity to place a block. */
  "minecraft:behavior.place_block": EntityMinecraftBehaviorPlaceBlock;
  /** Allows the mob to offer a flower to another mob with the minecraft:take_flower behavior. */
  "minecraft:behavior.play": EntityMinecraftBehaviorPlay;
  /** Allows this entity to pretend to be dead to avoid being targeted by attackers. */
  "minecraft:behavior.play_dead": EntityMinecraftBehaviorPlayDead;
  /** Allows this entity to damage a target by using a running attack. */
  "minecraft:behavior.ram_attack": EntityMinecraftBehaviorRamAttack;
  /** Allows this entity to locate a random target block that it can path find to. Once found, the entity will move towards it and dig up an item. [Default target block types: Dirt, Grass, Podzol, DirtWithRoots, MossBlock, Mud, MuddyMangroveRoots]. */
  "minecraft:behavior.random_search_and_dig": EntityMinecraftBehaviorRandomSearchAndDig;
  /** Allows an entity to attack by using ranged shots. "charge_shoot_trigger" must be greater than 0 to enable charged up burst-shot attacks. Requires minecraft:shooter to define projectile behaviour. */
  "minecraft:behavior.ranged_attack": EntityMinecraftBehaviorRangedAttack;
  /** Allows this entity to roar at another entity based on data in minecraft:anger_level. Once the anger threshold specified in minecraft:anger_level has been reached, this entity will roar for the specified amount of time, look at the other entity, apply anger boost towards it, and finally target it. */
  "minecraft:behavior.roar": EntityMinecraftBehaviorRoar;
  /** Causes the entity to grow tired every once in a while, while attacking. */
  "minecraft:behavior.slime_attack": EntityMinecraftBehaviorSlimeAttack;
  /** Allow slimes to float in water / lava. Can only be used by Slime and Magma Cubes. */
  "minecraft:behavior.slime_float": EntityMinecraftBehaviorSlimeFloat;
  /** Allows the entity to continuously jump around like a slime. */
  "minecraft:behavior.slime_keep_on_jumping": EntityMinecraftBehaviorSlimeKeepOnJumping;
  /** Allows the entity to move in random directions like a slime. */
  "minecraft:behavior.slime_random_direction": EntityMinecraftBehaviorSlimeRandomDirection;
  /** Allows this entity to detect the nearest player within "sniffing_radius" and update its "minecraft:suspect_tracking" component state */
  "minecraft:behavior.sniff": EntityMinecraftBehaviorSniff;
  /** Allows this entity to perform a 'sonic boom' ranged attack */
  "minecraft:behavior.sonic_boom": EntityMinecraftBehaviorSonicBoom;
  /** The entity will attempt to toss the items from its inventory to a nearby recently played noteblock. */
  "minecraft:behavior.stay_near_noteblock": EntityMinecraftBehaviorStayNearNoteblock;
  /** Allows an entity to attack using stomp AoE damage behavior. */
  "minecraft:behavior.stomp_attack": EntityMinecraftBehaviorStompAttack;
  /** Allows the entity go idle, if swimming. Entity must be in water. */
  "minecraft:behavior.swim_idle": EntityMinecraftBehaviorSwimIdle;
  /** Allows the mob to try to move to air once it is close to running out of its total breathable supply. Requires "minecraft:breathable". */
  "minecraft:behavior.swim_up_for_breath": EntityMinecraftBehaviorSwimUpForBreath;
  /** Allows the entity to wander around while swimming, when not path-finding. */
  "minecraft:behavior.swim_wander": EntityMinecraftBehaviorSwimWander;
  /** Allows this entity to locate a random target block that it can path find to. Once found, the entity will move towards it and dig up an item. [Default target block types: Dirt, Grass, Podzol, DirtWithRoots, MossBlock, Mud, MuddyMangroveRoots]. */
  "minecraft:behavior.swim_with_entity": EntityMinecraftBehaviorSwimWithEntity;
  /** Allows an entity to attack using swoop attack behavior; Ideal for use with flying mobs. The behavior ends if the entity has a horizontal collision or gets hit. */
  "minecraft:behavior.swoop_attack": EntityMinecraftBehaviorSwoopAttack;
  /** Allows the entity to take a block from the world and carry it around. */
  "minecraft:behavior.take_block": EntityMinecraftBehaviorTakeBlock;
  /** Allows the mob to accept flowers from another mob with the minecraft:offer_flower behavior. */
  "minecraft:behavior.take_flower": EntityMinecraftBehaviorTakeFlower;
  /** Allows an entity to teleport to its owner. */
  "minecraft:behavior.teleport_to_owner": EntityMinecraftBehaviorTeleportToOwner;
  /** Fires an event when this behavior starts, then waits for a duration before stopping. When stopping due to that timeout or due to being interrupted by another behavior, fires another event. query.timer_flag_1 will return 1.0 on both the client and server when this behavior is running, and 0.0 otherwise. */
  "minecraft:behavior.timer_flag_1": EntityMinecraftBehaviorTimerFlag1;
  /** Fires an event when this behavior starts, then waits for a duration before stopping. When stopping due to that timeout or due to being interrupted by another behavior, fires another event. query.timer_flag_2 will return 1.0 on both the client and server when this behavior is running, and 0.0 otherwise. */
  "minecraft:behavior.timer_flag_2": EntityMinecraftBehaviorTimerFlag2;
  /** Fires an event when this behavior starts, then waits for a duration before stopping. When stopping due to that timeout or due to being interrupted by another behavior, fires another event. query.timer_flag_3 will return 1.0 on both the client and server when this behavior is running, and 0.0 otherwise. */
  "minecraft:behavior.timer_flag_3": EntityMinecraftBehaviorTimerFlag3;
  /** Allows the player to trade with this mob. When the goal starts, it will stop the mob's navigation. */
  "minecraft:behavior.trade_with_player": EntityMinecraftBehaviorTradeWithPlayer;
  /** A behavior that enables a mob to transport items from and to containers. */
  "minecraft:behavior.transport_items": EntityMinecraftBehaviorTransportItems;
  /** Enables a mob to use kinetic weaponry by intermittently charging at its target and repositioning afterward. */
  "minecraft:behavior.use_kinetic_weapon": EntityMinecraftBehaviorUseKineticWeapon;
  /** Allows the NPC to use the POI */
  "minecraft:behavior.work": EntityMinecraftBehaviorWork;
  /** Allows the NPC to use the composter POI to convert excess seeds into bone meal. */
  "minecraft:behavior.work_composter": EntityMinecraftBehaviorWorkComposter;
  /** Prevents specified blocks from contributing to this entity's block movement slowdown. It does not cause other blocks to apply slowdown. */
  "minecraft:block_movement_slowdown_immunity": EntityMinecraftBlockMovementSlowdownImmunity;
  /** Minecraft Bounciness */
  "minecraft:bounciness": Record<string, unknown>;
  /** Defines whether an entity can stand on powder snow without sinking. */
  "minecraft:can_stand_on_powder_snow": Record<string, unknown>;
  /** Minecraft Dash Action */
  "minecraft:dash_action": Record<string, unknown>;
  /** Minecraft Free Camera Controlled */
  "minecraft:free_camera_controlled": Record<string, unknown>;
  /** Defines whether an entity should be affected by freezing. */
  "minecraft:freezing_immune": Record<string, unknown>;
  /** Defines whether an entity should take increased damage from freezing. */
  "minecraft:freezing_vulnerable": Record<string, unknown>;
  /** Flee Threat Minecraft Memory Behavior */
  "minecraft:memory_behavior.flee_threat": Record<string, unknown>;
  /** Follow Target Minecraft Memory Behavior */
  "minecraft:memory_behavior.follow_target": Record<string, unknown>;
  /** Game Event Minecraft Memory Sensor */
  "minecraft:memory_sensor.game_event": Record<string, unknown>;
  /** In Range Of Entity Minecraft Memory Sensor */
  "minecraft:memory_sensor.in_range_of_entity": Record<string, unknown>;
  /** Minecraft Not Pickable From Inside */
  "minecraft:not_pickable_from_inside": Record<string, unknown>;
  /** Minecraft Offspring */
  "minecraft:offspring": Record<string, unknown>;
  /** Allows to specify events to execute when equipment is set in the entity's default equipment slots. Doesn't apply to "minecraft:inventory", use "minecraft:equippable" instead. */
  "minecraft:on_equipment_changed": EntityMinecraftOnEquipmentChanged;
  /** Minecraft Pushable By Block */
  "minecraft:pushable_by_block": Record<string, unknown>;
  /** Allows an entity to be pushed by other entities. */
  "minecraft:pushable_by_entity": EntityMinecraftPushableByEntity;
  /** Minecraft Rotation Locked To Vehicle */
  "minecraft:rotation_locked_to_vehicle": Record<string, unknown>;
  /** Minecraft Spawn Egg Interaction */
  "minecraft:spawn_egg_interaction": Record<string, unknown>;
  /** Component for spawning entities when an entity perishes. */
  "minecraft:spawn_on_death": EntityMinecraftSpawnOnDeath;
  /** Minecraft Underwater Mount Breathing */
  "minecraft:underwater_mount_breathing": Record<string, unknown>;
  /** [DEPRECATED] Allows the entity to automatically determine which ambient sound to play:
  		\n - `ambient.in.air` when not on the ground
  		\n - `ambient.in.water` when its head is in water
  		\n - `ambient.baby` if it is a baby
  		\n - `ambient` otherwise
  
  *⚠️ Deprecated*
   * @deprecated */
  "minecraft:uses_legacy_ambient_sounds": Record<string, unknown>;
  /** Minecraft Uses Legacy Friction */
  "minecraft:uses_legacy_friction": Record<string, unknown>;
  /** Minecraft Uses Uniform Air Drag */
  "minecraft:uses_uniform_air_drag": Record<string, unknown>;
  /** Minecraft Vertical Movement Action */
  "minecraft:vertical_movement_action": Record<string, unknown>;
}

/** `minecraft:absorption` — Minecraft Absorption */
export const absorption = (value: EntityComponents["minecraft:absorption"] = {} as EntityComponents["minecraft:absorption"]): Component => component("minecraft:absorption", value);
/** `minecraft:addrider` — Adds a rider to the entity. */
export const addrider = (value: EntityComponents["minecraft:addrider"] = {} as EntityComponents["minecraft:addrider"]): Component => component("minecraft:addrider", value);
/** `minecraft:admire_item` — Allows an entity to ignore attackable targets for a given duration */
export const admireItem = (value: EntityComponents["minecraft:admire_item"] = {} as EntityComponents["minecraft:admire_item"]): Component => component("minecraft:admire_item", value);
/** `minecraft:ageable` — Adds a timer for the entity to grow up. It can be accelerated by giving the entity the items it likes as defined by feed_items. */
export const ageable = (value: EntityComponents["minecraft:ageable"] = {} as EntityComponents["minecraft:ageable"]): Component => component("minecraft:ageable", value);
/** `minecraft:ambient_sound_interval` — Delay for an entity playing its sound */
export const ambientSoundInterval = (value: EntityComponents["minecraft:ambient_sound_interval"] = {} as EntityComponents["minecraft:ambient_sound_interval"]): Component => component("minecraft:ambient_sound_interval", value);
/** `minecraft:anger_level` — Compels the entity to track anger towards a set of nuisances. */
export const angerLevel = (value: EntityComponents["minecraft:anger_level"] = {} as EntityComponents["minecraft:anger_level"]): Component => component("minecraft:anger_level", value);
/** `minecraft:angry` — Defines an entity's 'angry' state using a timer. */
export const angry = (value: EntityComponents["minecraft:angry"] = {} as EntityComponents["minecraft:angry"]): Component => component("minecraft:angry", value);
/** `minecraft:annotation.break_door` — Allows an entity to break doors, assuming that that flags set up for the component to use in navigation. */
export const annotationBreakDoor = (value: EntityComponents["minecraft:annotation.break_door"] = {} as EntityComponents["minecraft:annotation.break_door"]): Component => component("minecraft:annotation.break_door", value);
/** `minecraft:annotation.open_door` — Allows the entity to open doors. */
export const annotationOpenDoor = (value: EntityComponents["minecraft:annotation.open_door"] = {} as EntityComponents["minecraft:annotation.open_door"]): Component => component("minecraft:annotation.open_door", value);
/** `minecraft:area_attack` — A component that does damage to entities that get within range. */
export const areaAttack = (value: EntityComponents["minecraft:area_attack"] = {} as EntityComponents["minecraft:area_attack"]): Component => component("minecraft:area_attack", value);
/** `minecraft:attack` — Defines an entity's melee attack damage and any additional status effects applied on hit. Typical damage values range from 3 (zombie, creeper) to 7-21 (iron golem). */
export const attack = (value: EntityComponents["minecraft:attack"] = {} as EntityComponents["minecraft:attack"]): Component => component("minecraft:attack", value);
/** `minecraft:attack_cooldown` — Adds a cooldown to an entity. The intention of this cooldown is to be used to prevent the entity from attempting to acquire new attack targets. */
export const attackCooldown = (value: EntityComponents["minecraft:attack_cooldown"] = {} as EntityComponents["minecraft:attack_cooldown"]): Component => component("minecraft:attack_cooldown", value);
/** `minecraft:attack_damage` — Specifies how much damage is dealt by the entity when it attacks. */
export const attackDamage = (value: EntityComponents["minecraft:attack_damage"] = {} as EntityComponents["minecraft:attack_damage"]): Component => component("minecraft:attack_damage", value);
/** `minecraft:balloon` — Minecraft Balloon */
export const balloon = (value: EntityComponents["minecraft:balloon"] = {} as EntityComponents["minecraft:balloon"]): Component => component("minecraft:balloon", value);
/** `minecraft:balloonable` — Allows this entity to have a balloon attached and defines the conditions and events for this entity when is ballooned. */
export const balloonable = (value: EntityComponents["minecraft:balloonable"] = {} as EntityComponents["minecraft:balloonable"]): Component => component("minecraft:balloonable", value);
/** `minecraft:barter` — Enables the component to drop an item as a barter exchange. */
export const barter = (value: EntityComponents["minecraft:barter"] = {} as EntityComponents["minecraft:barter"]): Component => component("minecraft:barter", value);
/** `minecraft:behavior.admire_item` — Enables the mob to admire items that have been configured as admirable. */
export const behaviorAdmireItem = (value: EntityComponents["minecraft:behavior.admire_item"] = {} as EntityComponents["minecraft:behavior.admire_item"]): Component => component("minecraft:behavior.admire_item", value);
/** `minecraft:behavior.barter` — Enables the mob to barter for items that have been configured as barter currency. Must be used in combination with the barter component */
export const behaviorBarter = (value: EntityComponents["minecraft:behavior.barter"] = {} as EntityComponents["minecraft:behavior.barter"]): Component => component("minecraft:behavior.barter", value);
/** `minecraft:behavior.beg` — Allows this mob to look at and follow the player that holds food they like. */
export const behaviorBeg = (value: EntityComponents["minecraft:behavior.beg"] = {} as EntityComponents["minecraft:behavior.beg"]): Component => component("minecraft:behavior.beg", value);
/** `minecraft:behavior.break_door` — Allows this mob to break doors. */
export const behaviorBreakDoor = (value: EntityComponents["minecraft:behavior.break_door"] = {} as EntityComponents["minecraft:behavior.break_door"]): Component => component("minecraft:behavior.break_door", value);
/** `minecraft:behavior.breed` — Allows this mob to breed with other mobs. */
export const behaviorBreed = (value: EntityComponents["minecraft:behavior.breed"] = {} as EntityComponents["minecraft:behavior.breed"]): Component => component("minecraft:behavior.breed", value);
/** `minecraft:behavior.defend_trusted_target` — Allows the mob to target another mob that hurts an entity it trusts. */
export const behaviorDefendTrustedTarget = (value: EntityComponents["minecraft:behavior.defend_trusted_target"] = {} as EntityComponents["minecraft:behavior.defend_trusted_target"]): Component => component("minecraft:behavior.defend_trusted_target", value);
/** `minecraft:behavior.door_interact` — Allows the mob to open and close doors. */
export const behaviorDoorInteract = (value: EntityComponents["minecraft:behavior.door_interact"] = {} as EntityComponents["minecraft:behavior.door_interact"]): Component => component("minecraft:behavior.door_interact", value);
/** `minecraft:behavior.dragondeath` — Allows the dragon to go out with glory. This controls the Ender Dragon's death animation. */
export const behaviorDragondeath = (value: EntityComponents["minecraft:behavior.dragondeath"] = {} as EntityComponents["minecraft:behavior.dragondeath"]): Component => component("minecraft:behavior.dragondeath", value);
/** `minecraft:behavior.dragonholdingpattern` — Allows the Dragon to fly around in a circle around the center podium. */
export const behaviorDragonholdingpattern = (value: EntityComponents["minecraft:behavior.dragonholdingpattern"] = {} as EntityComponents["minecraft:behavior.dragonholdingpattern"]): Component => component("minecraft:behavior.dragonholdingpattern", value);
/** `minecraft:behavior.dragonlanding` — Allows the Dragon to stop flying and transition into perching mode. */
export const behaviorDragonlanding = (value: EntityComponents["minecraft:behavior.dragonlanding"] = {} as EntityComponents["minecraft:behavior.dragonlanding"]): Component => component("minecraft:behavior.dragonlanding", value);
/** `minecraft:behavior.dragonscanning` — Allows the dragon to look around for a player to attack while in perch mode. */
export const behaviorDragonscanning = (value: EntityComponents["minecraft:behavior.dragonscanning"] = {} as EntityComponents["minecraft:behavior.dragonscanning"]): Component => component("minecraft:behavior.dragonscanning", value);
/** `minecraft:behavior.dragontakeoff` — Allows the dragon to leave perch mode and go back to flying around. */
export const behaviorDragontakeoff = (value: EntityComponents["minecraft:behavior.dragontakeoff"] = {} as EntityComponents["minecraft:behavior.dragontakeoff"]): Component => component("minecraft:behavior.dragontakeoff", value);
/** `minecraft:behavior.drink_potion` — Allows the mob to drink potions based on specified environment conditions. */
export const behaviorDrinkPotion = (value: EntityComponents["minecraft:behavior.drink_potion"] = {} as EntityComponents["minecraft:behavior.drink_potion"]): Component => component("minecraft:behavior.drink_potion", value);
/** `minecraft:behavior.eat_carried_item` — If the mob is carrying a food item, the mob will eat it and the effects will be applied to the mob. */
export const behaviorEatCarriedItem = (value: EntityComponents["minecraft:behavior.eat_carried_item"] = {} as EntityComponents["minecraft:behavior.eat_carried_item"]): Component => component("minecraft:behavior.eat_carried_item", value);
/** `minecraft:behavior.enderman_leave_block` — Allows the enderman to drop a block they are carrying. */
export const behaviorEndermanLeaveBlock = (value: EntityComponents["minecraft:behavior.enderman_leave_block"] = {} as EntityComponents["minecraft:behavior.enderman_leave_block"]): Component => component("minecraft:behavior.enderman_leave_block", value);
/** `minecraft:behavior.enderman_take_block` — Allows the enderman to take a block and carry it around. */
export const behaviorEndermanTakeBlock = (value: EntityComponents["minecraft:behavior.enderman_take_block"] = {} as EntityComponents["minecraft:behavior.enderman_take_block"]): Component => component("minecraft:behavior.enderman_take_block", value);
/** `minecraft:behavior.find_cover` — Allows the mob to seek shade. */
export const behaviorFindCover = (value: EntityComponents["minecraft:behavior.find_cover"] = {} as EntityComponents["minecraft:behavior.find_cover"]): Component => component("minecraft:behavior.find_cover", value);
/** `minecraft:behavior.find_mount` — Allows the mob to look around for another mob to ride atop it. */
export const behaviorFindMount = (value: EntityComponents["minecraft:behavior.find_mount"] = {} as EntityComponents["minecraft:behavior.find_mount"]): Component => component("minecraft:behavior.find_mount", value);
/** `minecraft:behavior.find_underwater_treasure` — Allows the mob to move towards the nearest underwater ruin or shipwreck. */
export const behaviorFindUnderwaterTreasure = (value: EntityComponents["minecraft:behavior.find_underwater_treasure"] = {} as EntityComponents["minecraft:behavior.find_underwater_treasure"]): Component => component("minecraft:behavior.find_underwater_treasure", value);
/** `minecraft:behavior.flee_sun` — Allows the mob to run away from direct sunlight and seek shade. */
export const behaviorFleeSun = (value: EntityComponents["minecraft:behavior.flee_sun"] = {} as EntityComponents["minecraft:behavior.flee_sun"]): Component => component("minecraft:behavior.flee_sun", value);
/** `minecraft:behavior.float` — Allows the mob to stay afloat while swimming. Passengers will be kicked out the moment the mob's head goes underwater, which may not happen for tall mobs. */
export const behaviorFloat = (value: EntityComponents["minecraft:behavior.float"] = {} as EntityComponents["minecraft:behavior.float"]): Component => component("minecraft:behavior.float", value);
/** `minecraft:behavior.float_tempt` — Allows a mob to be tempted by a player holding a specific item. Uses point-to-point movement. Designed for mobs that are floating (e.g. use the "minecraft:navigation.float" component). */
export const behaviorFloatTempt = (value: EntityComponents["minecraft:behavior.float_tempt"] = {} as EntityComponents["minecraft:behavior.float_tempt"]): Component => component("minecraft:behavior.float_tempt", value);
/** `minecraft:behavior.float_wander` — Allows the mob to float around like the Ghast. */
export const behaviorFloatWander = (value: EntityComponents["minecraft:behavior.float_wander"] = {} as EntityComponents["minecraft:behavior.float_wander"]): Component => component("minecraft:behavior.float_wander", value);
/** `minecraft:behavior.follow_caravan` — Allows the mob to follow mobs that are in a caravan. */
export const behaviorFollowCaravan = (value: EntityComponents["minecraft:behavior.follow_caravan"] = {} as EntityComponents["minecraft:behavior.follow_caravan"]): Component => component("minecraft:behavior.follow_caravan", value);
/** `minecraft:behavior.follow_mob` — Allows the mob to follow other mobs. */
export const behaviorFollowMob = (value: EntityComponents["minecraft:behavior.follow_mob"] = {} as EntityComponents["minecraft:behavior.follow_mob"]): Component => component("minecraft:behavior.follow_mob", value);
/** `minecraft:behavior.follow_owner` — Allows a mob to follow the player that owns it. */
export const behaviorFollowOwner = (value: EntityComponents["minecraft:behavior.follow_owner"] = {} as EntityComponents["minecraft:behavior.follow_owner"]): Component => component("minecraft:behavior.follow_owner", value);
/** `minecraft:behavior.follow_parent` — Allows the mob to follow their parent around. */
export const behaviorFollowParent = (value: EntityComponents["minecraft:behavior.follow_parent"] = {} as EntityComponents["minecraft:behavior.follow_parent"]): Component => component("minecraft:behavior.follow_parent", value);
/** `minecraft:behavior.follow_target_captain` — Allows mob to move towards its current target captain. */
export const behaviorFollowTargetCaptain = (value: EntityComponents["minecraft:behavior.follow_target_captain"] = {} as EntityComponents["minecraft:behavior.follow_target_captain"]): Component => component("minecraft:behavior.follow_target_captain", value);
/** `minecraft:behavior.hide` — Allows a mob with the hide component to attempt to move to - and hide at - an owned or nearby POI. */
export const behaviorHide = (value: EntityComponents["minecraft:behavior.hide"] = {} as EntityComponents["minecraft:behavior.hide"]): Component => component("minecraft:behavior.hide", value);
/** `minecraft:behavior.hold_ground` — Compels an entity to stop at their current location, turn to face a mob they are targeting, and react with an event. */
export const behaviorHoldGround = (value: EntityComponents["minecraft:behavior.hold_ground"] = {} as EntityComponents["minecraft:behavior.hold_ground"]): Component => component("minecraft:behavior.hold_ground", value);
/** `minecraft:behavior.hover` — Allows the mob to hover in place. */
export const behaviorHover = (value: EntityComponents["minecraft:behavior.hover"] = {} as EntityComponents["minecraft:behavior.hover"]): Component => component("minecraft:behavior.hover", value);
/** `minecraft:behavior.hurt_by_target` — Allows the mob to target another mob that hurts them. */
export const behaviorHurtByTarget = (value: EntityComponents["minecraft:behavior.hurt_by_target"] = {} as EntityComponents["minecraft:behavior.hurt_by_target"]): Component => component("minecraft:behavior.hurt_by_target", value);
/** `minecraft:behavior.inspect_bookshelf` — Allows the mob to inspect bookshelves. */
export const behaviorInspectBookshelf = (value: EntityComponents["minecraft:behavior.inspect_bookshelf"] = {} as EntityComponents["minecraft:behavior.inspect_bookshelf"]): Component => component("minecraft:behavior.inspect_bookshelf", value);
/** `minecraft:behavior.lay_down` — Allows mobs to lay down at times */
export const behaviorLayDown = (value: EntityComponents["minecraft:behavior.lay_down"] = {} as EntityComponents["minecraft:behavior.lay_down"]): Component => component("minecraft:behavior.lay_down", value);
/** `minecraft:behavior.lay_egg` — Allows the mob to lay an egg block on certain types of blocks if the mob is pregnant. */
export const behaviorLayEgg = (value: EntityComponents["minecraft:behavior.lay_egg"] = {} as EntityComponents["minecraft:behavior.lay_egg"]): Component => component("minecraft:behavior.lay_egg", value);
/** `minecraft:behavior.leap_at_target` — Allows monsters to jump at and attack their target. Can only be used by hostile mobs. */
export const behaviorLeapAtTarget = (value: EntityComponents["minecraft:behavior.leap_at_target"] = {} as EntityComponents["minecraft:behavior.leap_at_target"]): Component => component("minecraft:behavior.leap_at_target", value);
/** `minecraft:behavior.look_at_entity` — Compels an entity to look at a specific entity by rotating the `head` bone pose within a set limit. */
export const behaviorLookAtEntity = (value: EntityComponents["minecraft:behavior.look_at_entity"] = {} as EntityComponents["minecraft:behavior.look_at_entity"]): Component => component("minecraft:behavior.look_at_entity", value);
/** `minecraft:behavior.look_at_player` — Compels an entity to look at the player by rotating the `head` bone pose within a set limit. */
export const behaviorLookAtPlayer = (value: EntityComponents["minecraft:behavior.look_at_player"] = {} as EntityComponents["minecraft:behavior.look_at_player"]): Component => component("minecraft:behavior.look_at_player", value);
/** `minecraft:behavior.look_at_target` — Compels an entity to look at the target by rotating the head bone pose within a set limit. */
export const behaviorLookAtTarget = (value: EntityComponents["minecraft:behavior.look_at_target"] = {} as EntityComponents["minecraft:behavior.look_at_target"]): Component => component("minecraft:behavior.look_at_target", value);
/** `minecraft:behavior.look_at_trading_player` — Compels an entity to look at the player that is currently trading with the entity. */
export const behaviorLookAtTradingPlayer = (value: EntityComponents["minecraft:behavior.look_at_trading_player"] = {} as EntityComponents["minecraft:behavior.look_at_trading_player"]): Component => component("minecraft:behavior.look_at_trading_player", value);
/** `minecraft:behavior.make_love` — Allows the villager to look for a mate to spawn other villagers with. */
export const behaviorMakeLove = (value: EntityComponents["minecraft:behavior.make_love"] = {} as EntityComponents["minecraft:behavior.make_love"]): Component => component("minecraft:behavior.make_love", value);
/** `minecraft:behavior.mingle` — Allows an entity to go to the village bell and mingle with other entities */
export const behaviorMingle = (value: EntityComponents["minecraft:behavior.mingle"] = {} as EntityComponents["minecraft:behavior.mingle"]): Component => component("minecraft:behavior.mingle", value);
/** `minecraft:behavior.mount_pathing` — Allows the mob to move around on its own while mounted seeking a target to attack. Also will allow an entity to target another entity for an attack. */
export const behaviorMountPathing = (value: EntityComponents["minecraft:behavior.mount_pathing"] = {} as EntityComponents["minecraft:behavior.mount_pathing"]): Component => component("minecraft:behavior.mount_pathing", value);
/** `minecraft:behavior.move_through_village` — Can only be used by Villagers. Allows the villagers to create paths around the village. */
export const behaviorMoveThroughVillage = (value: EntityComponents["minecraft:behavior.move_through_village"] = {} as EntityComponents["minecraft:behavior.move_through_village"]): Component => component("minecraft:behavior.move_through_village", value);
/** `minecraft:behavior.move_to_block` — Allows mob to move towards a block. */
export const behaviorMoveToBlock = (value: EntityComponents["minecraft:behavior.move_to_block"] = {} as EntityComponents["minecraft:behavior.move_to_block"]): Component => component("minecraft:behavior.move_to_block", value);
/** `minecraft:behavior.move_to_land` — Allows the mob to move back onto land when in water. */
export const behaviorMoveToLand = (value: EntityComponents["minecraft:behavior.move_to_land"] = {} as EntityComponents["minecraft:behavior.move_to_land"]): Component => component("minecraft:behavior.move_to_land", value);
/** `minecraft:behavior.move_to_lava` — Allows the mob to move back into lava when on land. This behavior has been replaced by minecraft:behavior.move_to_liquid. */
export const behaviorMoveToLava = (value: EntityComponents["minecraft:behavior.move_to_lava"] = {} as EntityComponents["minecraft:behavior.move_to_lava"]): Component => component("minecraft:behavior.move_to_lava", value);
/** `minecraft:behavior.move_to_liquid` — Allows the mob to move into a liquid when on land. */
export const behaviorMoveToLiquid = (value: EntityComponents["minecraft:behavior.move_to_liquid"] = {} as EntityComponents["minecraft:behavior.move_to_liquid"]): Component => component("minecraft:behavior.move_to_liquid", value);
/** `minecraft:behavior.move_to_poi` — Allows the mob to move to a POI if able to */
export const behaviorMoveToPoi = (value: EntityComponents["minecraft:behavior.move_to_poi"] = {} as EntityComponents["minecraft:behavior.move_to_poi"]): Component => component("minecraft:behavior.move_to_poi", value);
/** `minecraft:behavior.move_to_random_block` — Allows mob to move towards a random block. */
export const behaviorMoveToRandomBlock = (value: EntityComponents["minecraft:behavior.move_to_random_block"] = {} as EntityComponents["minecraft:behavior.move_to_random_block"]): Component => component("minecraft:behavior.move_to_random_block", value);
/** `minecraft:behavior.move_to_village` — Allows the mob to move into a random location within a village. */
export const behaviorMoveToVillage = (value: EntityComponents["minecraft:behavior.move_to_village"] = {} as EntityComponents["minecraft:behavior.move_to_village"]): Component => component("minecraft:behavior.move_to_village", value);
/** `minecraft:behavior.move_to_water` — Allows the mob to move back into water when on land. */
export const behaviorMoveToWater = (value: EntityComponents["minecraft:behavior.move_to_water"] = {} as EntityComponents["minecraft:behavior.move_to_water"]): Component => component("minecraft:behavior.move_to_water", value);
/** `minecraft:behavior.move_towards_target` — Allows mob to move towards its current target. */
export const behaviorMoveTowardsTarget = (value: EntityComponents["minecraft:behavior.move_towards_target"] = {} as EntityComponents["minecraft:behavior.move_towards_target"]): Component => component("minecraft:behavior.move_towards_target", value);
/** `minecraft:behavior.nap` — Allows mobs to occassionally stop and take a nap under certain conditions. */
export const behaviorNap = (value: EntityComponents["minecraft:behavior.nap"] = {} as EntityComponents["minecraft:behavior.nap"]): Component => component("minecraft:behavior.nap", value);
/** `minecraft:behavior.nearest_attackable_target` — Allows an entity to attack the closest target within a given subset of specific target types. */
export const behaviorNearestAttackableTarget = (value: EntityComponents["minecraft:behavior.nearest_attackable_target"] = {} as EntityComponents["minecraft:behavior.nearest_attackable_target"]): Component => component("minecraft:behavior.nearest_attackable_target", value);
/** `minecraft:behavior.nearest_prioritized_attackable_target` — Allows the mob to check for and pursue the nearest valid target. */
export const behaviorNearestPrioritizedAttackableTarget = (value: EntityComponents["minecraft:behavior.nearest_prioritized_attackable_target"] = {} as EntityComponents["minecraft:behavior.nearest_prioritized_attackable_target"]): Component => component("minecraft:behavior.nearest_prioritized_attackable_target", value);
/** `minecraft:behavior.ocelot_sit_on_block` — Allows to mob to be able to sit in place like the ocelot. */
export const behaviorOcelotSitOnBlock = (value: EntityComponents["minecraft:behavior.ocelot_sit_on_block"] = {} as EntityComponents["minecraft:behavior.ocelot_sit_on_block"]): Component => component("minecraft:behavior.ocelot_sit_on_block", value);
/** `minecraft:behavior.open_door` — Allows the mob to open doors. Requires the mob to be able to path through doors, otherwise the mob won't even want to try opening them. */
export const behaviorOpenDoor = (value: EntityComponents["minecraft:behavior.open_door"] = {} as EntityComponents["minecraft:behavior.open_door"]): Component => component("minecraft:behavior.open_door", value);
/** `minecraft:behavior.owner_hurt_by_target` — Allows the mob to target another mob that hurts their owner. */
export const behaviorOwnerHurtByTarget = (value: EntityComponents["minecraft:behavior.owner_hurt_by_target"] = {} as EntityComponents["minecraft:behavior.owner_hurt_by_target"]): Component => component("minecraft:behavior.owner_hurt_by_target", value);
/** `minecraft:behavior.owner_hurt_target` — Allows the mob to target a mob that is hurt by their owner. */
export const behaviorOwnerHurtTarget = (value: EntityComponents["minecraft:behavior.owner_hurt_target"] = {} as EntityComponents["minecraft:behavior.owner_hurt_target"]): Component => component("minecraft:behavior.owner_hurt_target", value);
/** `minecraft:behavior.panic` — Allows the mob to enter the panic state, which makes it run around and away from the damage source that made it enter this state. */
export const behaviorPanic = (value: EntityComponents["minecraft:behavior.panic"] = {} as EntityComponents["minecraft:behavior.panic"]): Component => component("minecraft:behavior.panic", value);
/** `minecraft:behavior.pet_sleep_with_owner` — Allows the pet mob to move onto a bed with its owner while sleeping. */
export const behaviorPetSleepWithOwner = (value: EntityComponents["minecraft:behavior.pet_sleep_with_owner"] = {} as EntityComponents["minecraft:behavior.pet_sleep_with_owner"]): Component => component("minecraft:behavior.pet_sleep_with_owner", value);
/** `minecraft:behavior.pickup_items` — Allows the mob to pick up items on the ground. */
export const behaviorPickupItems = (value: EntityComponents["minecraft:behavior.pickup_items"] = {} as EntityComponents["minecraft:behavior.pickup_items"]): Component => component("minecraft:behavior.pickup_items", value);
/** `minecraft:behavior.player_ride_tamed` — Allows the mob to be ridden by the player after being tamed. */
export const behaviorPlayerRideTamed = (value: EntityComponents["minecraft:behavior.player_ride_tamed"] = {} as EntityComponents["minecraft:behavior.player_ride_tamed"]): Component => component("minecraft:behavior.player_ride_tamed", value);
/** `minecraft:behavior.raid_garden` — Allows the mob to eat/raid crops out of farms until they are full. */
export const behaviorRaidGarden = (value: EntityComponents["minecraft:behavior.raid_garden"] = {} as EntityComponents["minecraft:behavior.raid_garden"]): Component => component("minecraft:behavior.raid_garden", value);
/** `minecraft:behavior.random_breach` — Allows the mob to randomly break surface of the water. */
export const behaviorRandomBreach = (value: EntityComponents["minecraft:behavior.random_breach"] = {} as EntityComponents["minecraft:behavior.random_breach"]): Component => component("minecraft:behavior.random_breach", value);
/** `minecraft:behavior.random_fly` — Allows a mob to randomly fly around. */
export const behaviorRandomFly = (value: EntityComponents["minecraft:behavior.random_fly"] = {} as EntityComponents["minecraft:behavior.random_fly"]): Component => component("minecraft:behavior.random_fly", value);
/** `minecraft:behavior.random_hover` — Allows the mob to hover around randomly, close to the surface. */
export const behaviorRandomHover = (value: EntityComponents["minecraft:behavior.random_hover"] = {} as EntityComponents["minecraft:behavior.random_hover"]): Component => component("minecraft:behavior.random_hover", value);
/** `minecraft:behavior.random_look_around` — Allows the mob to randomly look around. */
export const behaviorRandomLookAround = (value: EntityComponents["minecraft:behavior.random_look_around"] = {} as EntityComponents["minecraft:behavior.random_look_around"]): Component => component("minecraft:behavior.random_look_around", value);
/** `minecraft:behavior.random_look_around_and_sit` — Allows the mob to randomly sit and look around for a duration. Note: Must have a sitting animation set up to use this. */
export const behaviorRandomLookAroundAndSit = (value: EntityComponents["minecraft:behavior.random_look_around_and_sit"] = {} as EntityComponents["minecraft:behavior.random_look_around_and_sit"]): Component => component("minecraft:behavior.random_look_around_and_sit", value);
/** `minecraft:behavior.random_sitting` — Allows the mob to randomly sit for a duration. */
export const behaviorRandomSitting = (value: EntityComponents["minecraft:behavior.random_sitting"] = {} as EntityComponents["minecraft:behavior.random_sitting"]): Component => component("minecraft:behavior.random_sitting", value);
/** `minecraft:behavior.random_stroll` — Allows a mob to randomly stroll around. */
export const behaviorRandomStroll = (value: EntityComponents["minecraft:behavior.random_stroll"] = {} as EntityComponents["minecraft:behavior.random_stroll"]): Component => component("minecraft:behavior.random_stroll", value);
/** `minecraft:behavior.random_swim` — Allows an entity to randomly move through water */
export const behaviorRandomSwim = (value: EntityComponents["minecraft:behavior.random_swim"] = {} as EntityComponents["minecraft:behavior.random_swim"]): Component => component("minecraft:behavior.random_swim", value);
/** `minecraft:behavior.receive_love` — Allows the villager to stop so another villager can breed with it. Can only be used by a Villager. */
export const behaviorReceiveLove = (value: EntityComponents["minecraft:behavior.receive_love"] = {} as EntityComponents["minecraft:behavior.receive_love"]): Component => component("minecraft:behavior.receive_love", value);
/** `minecraft:behavior.restrict_open_door` — Allows the mob to stay indoors during night time. */
export const behaviorRestrictOpenDoor = (value: EntityComponents["minecraft:behavior.restrict_open_door"] = {} as EntityComponents["minecraft:behavior.restrict_open_door"]): Component => component("minecraft:behavior.restrict_open_door", value);
/** `minecraft:behavior.restrict_sun` — Allows the mob to automatically start avoiding the sun when its a clear day out. */
export const behaviorRestrictSun = (value: EntityComponents["minecraft:behavior.restrict_sun"] = {} as EntityComponents["minecraft:behavior.restrict_sun"]): Component => component("minecraft:behavior.restrict_sun", value);
/** `minecraft:behavior.rise_to_liquid_level` — Allows the mob to stay at a certain level when in liquid. */
export const behaviorRiseToLiquidLevel = (value: EntityComponents["minecraft:behavior.rise_to_liquid_level"] = {} as EntityComponents["minecraft:behavior.rise_to_liquid_level"]): Component => component("minecraft:behavior.rise_to_liquid_level", value);
/** `minecraft:behavior.roll` — This allows the mob to roll forward. */
export const behaviorRoll = (value: EntityComponents["minecraft:behavior.roll"] = {} as EntityComponents["minecraft:behavior.roll"]): Component => component("minecraft:behavior.roll", value);
/** `minecraft:behavior.run_around_like_crazy` — Allows the mob to run around aimlessly. */
export const behaviorRunAroundLikeCrazy = (value: EntityComponents["minecraft:behavior.run_around_like_crazy"] = {} as EntityComponents["minecraft:behavior.run_around_like_crazy"]): Component => component("minecraft:behavior.run_around_like_crazy", value);
/** `minecraft:behavior.scared` — Allows the mob to become scared when the weather outside is thundering. */
export const behaviorScared = (value: EntityComponents["minecraft:behavior.scared"] = {} as EntityComponents["minecraft:behavior.scared"]): Component => component("minecraft:behavior.scared", value);
/** `minecraft:behavior.send_event` — Allows the mob to send an event to another mob. */
export const behaviorSendEvent = (value: EntityComponents["minecraft:behavior.send_event"] = {} as EntityComponents["minecraft:behavior.send_event"]): Component => component("minecraft:behavior.send_event", value);
/** `minecraft:behavior.share_items` — Allows the mob to give items it has to others. */
export const behaviorShareItems = (value: EntityComponents["minecraft:behavior.share_items"] = {} as EntityComponents["minecraft:behavior.share_items"]): Component => component("minecraft:behavior.share_items", value);
/** `minecraft:behavior.silverfish_merge_with_stone` — Allows the mob to go into stone blocks like Silverfish do. */
export const behaviorSilverfishMergeWithStone = (value: EntityComponents["minecraft:behavior.silverfish_merge_with_stone"] = {} as EntityComponents["minecraft:behavior.silverfish_merge_with_stone"]): Component => component("minecraft:behavior.silverfish_merge_with_stone", value);
/** `minecraft:behavior.silverfish_wake_up_friends` — Allows the mob to alert mobs in nearby blocks to come out. */
export const behaviorSilverfishWakeUpFriends = (value: EntityComponents["minecraft:behavior.silverfish_wake_up_friends"] = {} as EntityComponents["minecraft:behavior.silverfish_wake_up_friends"]): Component => component("minecraft:behavior.silverfish_wake_up_friends", value);
/** `minecraft:behavior.skeleton_horse_trap` — Allows Equine mobs to be Horse Traps and be triggered like them, spawning a lightning bolt and a bunch of horses when a player is nearby. Can only be used by Horses, Mules, Donkeys and Skeleton Horses. */
export const behaviorSkeletonHorseTrap = (value: EntityComponents["minecraft:behavior.skeleton_horse_trap"] = {} as EntityComponents["minecraft:behavior.skeleton_horse_trap"]): Component => component("minecraft:behavior.skeleton_horse_trap", value);
/** `minecraft:behavior.sleep` — Allows mobs that own a bed to in a village to move to and sleep in it. */
export const behaviorSleep = (value: EntityComponents["minecraft:behavior.sleep"] = {} as EntityComponents["minecraft:behavior.sleep"]): Component => component("minecraft:behavior.sleep", value);
/** `minecraft:behavior.snacking` — Allows the mob to take a load off and snack on food that it found nearby. */
export const behaviorSnacking = (value: EntityComponents["minecraft:behavior.snacking"] = {} as EntityComponents["minecraft:behavior.snacking"]): Component => component("minecraft:behavior.snacking", value);
/** `minecraft:behavior.sneeze` — Allows the mob to sneeze, causing it to drop items and affect nearby mobs. */
export const behaviorSneeze = (value: EntityComponents["minecraft:behavior.sneeze"] = {} as EntityComponents["minecraft:behavior.sneeze"]): Component => component("minecraft:behavior.sneeze", value);
/** `minecraft:behavior.squid_dive` — Allows the squid to dive down in water. */
export const behaviorSquidDive = (value: EntityComponents["minecraft:behavior.squid_dive"] = {} as EntityComponents["minecraft:behavior.squid_dive"]): Component => component("minecraft:behavior.squid_dive", value);
/** `minecraft:behavior.squid_flee` — Allows the squid to swim away. */
export const behaviorSquidFlee = (value: EntityComponents["minecraft:behavior.squid_flee"] = {} as EntityComponents["minecraft:behavior.squid_flee"]): Component => component("minecraft:behavior.squid_flee", value);
/** `minecraft:behavior.squid_idle` — Allows the squid to swim in place idly. */
export const behaviorSquidIdle = (value: EntityComponents["minecraft:behavior.squid_idle"] = {} as EntityComponents["minecraft:behavior.squid_idle"]): Component => component("minecraft:behavior.squid_idle", value);
/** `minecraft:behavior.squid_move_away_from_ground` — Allows the squid to move away from ground blocks and back to water. */
export const behaviorSquidMoveAwayFromGround = (value: EntityComponents["minecraft:behavior.squid_move_away_from_ground"] = {} as EntityComponents["minecraft:behavior.squid_move_away_from_ground"]): Component => component("minecraft:behavior.squid_move_away_from_ground", value);
/** `minecraft:behavior.squid_out_of_water` — Allows the squid to stick to the ground when outside water. */
export const behaviorSquidOutOfWater = (value: EntityComponents["minecraft:behavior.squid_out_of_water"] = {} as EntityComponents["minecraft:behavior.squid_out_of_water"]): Component => component("minecraft:behavior.squid_out_of_water", value);
/** `minecraft:behavior.stalk_and_pounce_on_target` — Allows a mob to stalk a target, then once within range pounce onto a target, on success the target will be attacked dealing damage defined by the attack component. On failure, the mob will risk getting stuck */
export const behaviorStalkAndPounceOnTarget = (value: EntityComponents["minecraft:behavior.stalk_and_pounce_on_target"] = {} as EntityComponents["minecraft:behavior.stalk_and_pounce_on_target"]): Component => component("minecraft:behavior.stalk_and_pounce_on_target", value);
/** `minecraft:behavior.stay_while_sitting` — Allows the mob to stay put while it is in a sitting state instead of doing something else. */
export const behaviorStayWhileSitting = (value: EntityComponents["minecraft:behavior.stay_while_sitting"] = {} as EntityComponents["minecraft:behavior.stay_while_sitting"]): Component => component("minecraft:behavior.stay_while_sitting", value);
/** `minecraft:behavior.stomp_turtle_egg` — Allows this mob to stomp turtle eggs */
export const behaviorStompTurtleEgg = (value: EntityComponents["minecraft:behavior.stomp_turtle_egg"] = {} as EntityComponents["minecraft:behavior.stomp_turtle_egg"]): Component => component("minecraft:behavior.stomp_turtle_egg", value);
/** `minecraft:behavior.stroll_towards_village` — Allows the mob to move into a random location within a village within the search range. */
export const behaviorStrollTowardsVillage = (value: EntityComponents["minecraft:behavior.stroll_towards_village"] = {} as EntityComponents["minecraft:behavior.stroll_towards_village"]): Component => component("minecraft:behavior.stroll_towards_village", value);
/** `minecraft:behavior.summon_entity` — Allows the mob to attack the player by summoning other entities. */
export const behaviorSummonEntity = (value: EntityComponents["minecraft:behavior.summon_entity"] = {} as EntityComponents["minecraft:behavior.summon_entity"]): Component => component("minecraft:behavior.summon_entity", value);
/** `minecraft:behavior.swell` — Allows the creeper to swell up when a player is nearby. It can only be used by Creepers. */
export const behaviorSwell = (value: EntityComponents["minecraft:behavior.swell"] = {} as EntityComponents["minecraft:behavior.swell"]): Component => component("minecraft:behavior.swell", value);
/** `minecraft:behavior.target_when_pushed` — Allows the mob to target another mob when it is pushed by that mob. */
export const behaviorTargetWhenPushed = (value: EntityComponents["minecraft:behavior.target_when_pushed"] = {} as EntityComponents["minecraft:behavior.target_when_pushed"]): Component => component("minecraft:behavior.target_when_pushed", value);
/** `minecraft:behavior.tempt` — Allows a mob to be tempted by a player holding a specific item. Uses pathfinding for movement. */
export const behaviorTempt = (value: EntityComponents["minecraft:behavior.tempt"] = {} as EntityComponents["minecraft:behavior.tempt"]): Component => component("minecraft:behavior.tempt", value);
/** `minecraft:behavior.trade_interest` — Allows the mob to look at a player that is holding a tradable item. */
export const behaviorTradeInterest = (value: EntityComponents["minecraft:behavior.trade_interest"] = {} as EntityComponents["minecraft:behavior.trade_interest"]): Component => component("minecraft:behavior.trade_interest", value);
/** `minecraft:behavior.vex_copy_owner_target` — Allows the mob to target the same entity its owner is targeting. */
export const behaviorVexCopyOwnerTarget = (value: EntityComponents["minecraft:behavior.vex_copy_owner_target"] = {} as EntityComponents["minecraft:behavior.vex_copy_owner_target"]): Component => component("minecraft:behavior.vex_copy_owner_target", value);
/** `minecraft:behavior.vex_random_move` — Allows the mob to move around randomly like the Vex. */
export const behaviorVexRandomMove = (value: EntityComponents["minecraft:behavior.vex_random_move"] = {} as EntityComponents["minecraft:behavior.vex_random_move"]): Component => component("minecraft:behavior.vex_random_move", value);
/** `minecraft:behavior.wither_random_attack_pos_goal` — Allows the wither to launch random attacks. */
export const behaviorWitherRandomAttackPosGoal = (value: EntityComponents["minecraft:behavior.wither_random_attack_pos_goal"] = {} as EntityComponents["minecraft:behavior.wither_random_attack_pos_goal"]): Component => component("minecraft:behavior.wither_random_attack_pos_goal", value);
/** `minecraft:behavior.wither_target_highest_damage` — Allows the wither to focus its attacks on whichever mob has dealt the most damage to it. */
export const behaviorWitherTargetHighestDamage = (value: EntityComponents["minecraft:behavior.wither_target_highest_damage"] = {} as EntityComponents["minecraft:behavior.wither_target_highest_damage"]): Component => component("minecraft:behavior.wither_target_highest_damage", value);
/** `minecraft:block_climber` — Allows the player to detect and manuever on the scaffolding block. */
export const blockClimber = (value: EntityComponents["minecraft:block_climber"] = {} as EntityComponents["minecraft:block_climber"]): Component => component("minecraft:block_climber", value);
/** `minecraft:block_sensor` — Fires off a specified event when a block in the block list is broken within the sensor range. */
export const blockSensor = (value: EntityComponents["minecraft:block_sensor"] = {} as EntityComponents["minecraft:block_sensor"]): Component => component("minecraft:block_sensor", value);
/** `minecraft:body_rotation_always_follows_head` — Causes the entity's body rotation to match the one of their head.
Does not override the "minecraft:body_rotation_blocked" component. */
export const bodyRotationAlwaysFollowsHead = (value: EntityComponents["minecraft:body_rotation_always_follows_head"] = {} as EntityComponents["minecraft:body_rotation_always_follows_head"]): Component => component("minecraft:body_rotation_always_follows_head", value);
/** `minecraft:body_rotation_blocked` — When set, the entity will no longer visually rotate their body to match their facing direction. */
export const bodyRotationBlocked = (value: EntityComponents["minecraft:body_rotation_blocked"] = {} as EntityComponents["minecraft:body_rotation_blocked"]): Component => component("minecraft:body_rotation_blocked", value);
/** `minecraft:boostable` — Defines the conditions and behavior of a rideable entity's boost. */
export const boostable = (value: EntityComponents["minecraft:boostable"] = {} as EntityComponents["minecraft:boostable"]): Component => component("minecraft:boostable", value);
/** `minecraft:boss` — Defines the current state of the boss for updating the boss HUD. */
export const boss = (value: EntityComponents["minecraft:boss"] = {} as EntityComponents["minecraft:boss"]): Component => component("minecraft:boss", value);
/** `minecraft:break_blocks` — Specifies the blocks that the entity can break as it moves around. */
export const breakBlocks = (value: EntityComponents["minecraft:break_blocks"] = {} as EntityComponents["minecraft:break_blocks"]): Component => component("minecraft:break_blocks", value);
/** `minecraft:breathable` — Defines what blocks this entity can breathe in and gives them the ability to suffocate. */
export const breathable = (value: EntityComponents["minecraft:breathable"] = {} as EntityComponents["minecraft:breathable"]): Component => component("minecraft:breathable", value);
/** `minecraft:breedable` — Allows an entity to establish a way to get into the love state used for breeding. */
export const breedable = (value: EntityComponents["minecraft:breedable"] = {} as EntityComponents["minecraft:breedable"]): Component => component("minecraft:breedable", value);
/** `minecraft:bribeable` — Defines the way an entity can get into the 'bribed' state. */
export const bribeable = (value: EntityComponents["minecraft:bribeable"] = {} as EntityComponents["minecraft:bribeable"]): Component => component("minecraft:bribeable", value);
/** `minecraft:bucketable` — Minecraft Bucketable */
export const bucketable = (value: EntityComponents["minecraft:bucketable"] = {} as EntityComponents["minecraft:bucketable"]): Component => component("minecraft:bucketable", value);
/** `minecraft:buoyant` — Enables an entity to float on the specified liquid blocks. */
export const buoyant = (value: EntityComponents["minecraft:buoyant"] = {} as EntityComponents["minecraft:buoyant"]): Component => component("minecraft:buoyant", value);
/** `minecraft:burns_in_daylight` — Specifies that this entity takes fire damage when exposed to direct sunlight. This component is used by undead mobs like zombies, skeletons, and phantoms. The entity will catch fire when in sunlight unless it is wearing armor in the protection slot, standing in water, or in a shaded area. */
export const burnsInDaylight = (value: EntityComponents["minecraft:burns_in_daylight"] = {} as EntityComponents["minecraft:burns_in_daylight"]): Component => component("minecraft:burns_in_daylight", value);
/** `minecraft:can_climb` — Allows an entity to climb ladders. */
export const canClimb = (value: EntityComponents["minecraft:can_climb"] = {} as EntityComponents["minecraft:can_climb"]): Component => component("minecraft:can_climb", value);
/** `minecraft:can_fly` — Marks the entity as being able to fly, the pathfinder won't be restricted to paths where a solid block is required underneath it. */
export const canFly = (value: EntityComponents["minecraft:can_fly"] = {} as EntityComponents["minecraft:can_fly"]): Component => component("minecraft:can_fly", value);
/** `minecraft:can_join_raid` — Specifies if an entity can join a raid. */
export const canJoinRaid = (value: EntityComponents["minecraft:can_join_raid"] = {} as EntityComponents["minecraft:can_join_raid"]): Component => component("minecraft:can_join_raid", value);
/** `minecraft:can_power_jump` — Allows the entity to power jump like the Horse does in Vanilla. */
export const canPowerJump = (value: EntityComponents["minecraft:can_power_jump"] = {} as EntityComponents["minecraft:can_power_jump"]): Component => component("minecraft:can_power_jump", value);
/** `minecraft:cannot_be_attacked` — When set, blocks entities from attacking the owner entity unless they have the "minecraft:ignore_cannot_be_attacked" component. */
export const cannotBeAttacked = (value: EntityComponents["minecraft:cannot_be_attacked"] = {} as EntityComponents["minecraft:cannot_be_attacked"]): Component => component("minecraft:cannot_be_attacked", value);
/** `minecraft:celebrate_hunt` — Specifies hunt celebration behaviour. */
export const celebrateHunt = (value: EntityComponents["minecraft:celebrate_hunt"] = {} as EntityComponents["minecraft:celebrate_hunt"]): Component => component("minecraft:celebrate_hunt", value);
/** `minecraft:collision_box` — Sets the width and height of the Entity's collision box. */
export const collisionBox = (value: EntityComponents["minecraft:collision_box"] = {} as EntityComponents["minecraft:collision_box"]): Component => component("minecraft:collision_box", value);
/** `minecraft:color` — Defines the entity's main color. */
export const color = (value: EntityComponents["minecraft:color"] = {} as EntityComponents["minecraft:color"]): Component => component("minecraft:color", value);
/** `minecraft:color2` — Defines the entity's second texture color. */
export const color2 = (value: EntityComponents["minecraft:color2"] = {} as EntityComponents["minecraft:color2"]): Component => component("minecraft:color2", value);
/** `minecraft:combat_regeneration` — Gives `Regeneration I` and removes `Mining Fatigue` from the mob that kills the entity's attack target. */
export const combatRegeneration = (value: EntityComponents["minecraft:combat_regeneration"] = {} as EntityComponents["minecraft:combat_regeneration"]): Component => component("minecraft:combat_regeneration", value);
/** `minecraft:conditional_bandwidth_optimization` — Defines the Conditional Spatial Update Bandwidth Optimizations of this entity. */
export const conditionalBandwidthOptimization = (value: EntityComponents["minecraft:conditional_bandwidth_optimization"] = {} as EntityComponents["minecraft:conditional_bandwidth_optimization"]): Component => component("minecraft:conditional_bandwidth_optimization", value);
/** `minecraft:custom_hit_test` — List of hitboxes for melee and ranged hits against the entity. */
export const customHitTest = (value: EntityComponents["minecraft:custom_hit_test"] = {} as EntityComponents["minecraft:custom_hit_test"]): Component => component("minecraft:custom_hit_test", value);
/** `minecraft:damage_over_time` — Applies defined amount of damage to the entity at specified intervals. */
export const damageOverTime = (value: EntityComponents["minecraft:damage_over_time"] = {} as EntityComponents["minecraft:damage_over_time"]): Component => component("minecraft:damage_over_time", value);
/** `minecraft:damage_sensor` — Defines what events to call when this entity is damaged by specific entities or items. */
export const damageSensor = (value: EntityComponents["minecraft:damage_sensor"] = {} as EntityComponents["minecraft:damage_sensor"]): Component => component("minecraft:damage_sensor", value);
/** `minecraft:dash` — Ability for a rideable entity to dash. */
export const dash = (value: EntityComponents["minecraft:dash"] = {} as EntityComponents["minecraft:dash"]): Component => component("minecraft:dash", value);
/** `minecraft:default_look_angle` — Sets this entity's default head rotation angle. */
export const defaultLookAngle = (value: EntityComponents["minecraft:default_look_angle"] = {} as EntityComponents["minecraft:default_look_angle"]): Component => component("minecraft:default_look_angle", value);
/** `minecraft:despawn` — Despawns the Actor when the despawn rules or optional filters evaluate to true. */
export const despawn = (value: EntityComponents["minecraft:despawn"] = {} as EntityComponents["minecraft:despawn"]): Component => component("minecraft:despawn", value);
/** `minecraft:dimension_bound` — Prevents the entity from changing dimension through portals. */
export const dimensionBound = (value: EntityComponents["minecraft:dimension_bound"] = {} as EntityComponents["minecraft:dimension_bound"]): Component => component("minecraft:dimension_bound", value);
/** `minecraft:drying_out_timer` — Adds a timer for drying out that will count down and fire 'dried_out_event' or will stop as soon as the entity will get under rain or water and fire 'stopped_drying_out_event' */
export const dryingOutTimer = (value: EntityComponents["minecraft:drying_out_timer"] = {} as EntityComponents["minecraft:drying_out_timer"]): Component => component("minecraft:drying_out_timer", value);
/** `minecraft:dweller` — Compels an entity to join and migrate between villages and other dwellings. */
export const dweller = (value: EntityComponents["minecraft:dweller"] = {} as EntityComponents["minecraft:dweller"]): Component => component("minecraft:dweller", value);
/** `minecraft:economy_trade_table` — Defines this entity's ability to trade with players. */
export const economyTradeTable = (value: EntityComponents["minecraft:economy_trade_table"] = {} as EntityComponents["minecraft:economy_trade_table"]): Component => component("minecraft:economy_trade_table", value);
/** `minecraft:entity_armor_equipment_slot_mapping` — It defines to which armor slot an item equipped to 'minecraft:equippable''s second slot should be equipped to. It is automatically applied to all entities for worlds with a version greater than or equal to 1.21.10. For older worlds, 'slot.armor.torso' will be used. It is strongly advised not to explicitly use this component, as no backwards compatibility for it will be provided. */
export const entityArmorEquipmentSlotMapping = (value: EntityComponents["minecraft:entity_armor_equipment_slot_mapping"] = {} as EntityComponents["minecraft:entity_armor_equipment_slot_mapping"]): Component => component("minecraft:entity_armor_equipment_slot_mapping", value);
/** `minecraft:entity_sensor` — A component that owns multiple subsensors, each one firing an event when a set of conditions are met by other entities within the defined range. */
export const entitySensor = (value: EntityComponents["minecraft:entity_sensor"] = {} as EntityComponents["minecraft:entity_sensor"]): Component => component("minecraft:entity_sensor", value);
/** `minecraft:environment_sensor` — Creates a trigger based on environment conditions. */
export const environmentSensor = (value: EntityComponents["minecraft:environment_sensor"] = {} as EntityComponents["minecraft:environment_sensor"]): Component => component("minecraft:environment_sensor", value);
/** `minecraft:equip_item` — The entity puts on the desired equipment. */
export const equipItem = (value: EntityComponents["minecraft:equip_item"] = {} as EntityComponents["minecraft:equip_item"]): Component => component("minecraft:equip_item", value);
/** `minecraft:equipment` — Sets the Equipment table to use for this Entity. */
export const equipment = (value: EntityComponents["minecraft:equipment"] = {} as EntityComponents["minecraft:equipment"]): Component => component("minecraft:equipment", value);
/** `minecraft:equippable` — Defines an entity's behavior for having items equipped to it. */
export const equippable = (value: EntityComponents["minecraft:equippable"] = {} as EntityComponents["minecraft:equippable"]): Component => component("minecraft:equippable", value);
/** `minecraft:exhaustion_values` — Defines how much exhaustion each player action should take. */
export const exhaustionValues = (value: EntityComponents["minecraft:exhaustion_values"] = {} as EntityComponents["minecraft:exhaustion_values"]): Component => component("minecraft:exhaustion_values", value);
/** `minecraft:experience_reward` — . */
export const experienceReward = (value: EntityComponents["minecraft:experience_reward"] = {} as EntityComponents["minecraft:experience_reward"]): Component => component("minecraft:experience_reward", value);
/** `minecraft:explode` — Defines how the entity explodes. */
export const explode = (value: EntityComponents["minecraft:explode"] = {} as EntityComponents["minecraft:explode"]): Component => component("minecraft:explode", value);
/** `minecraft:fire_immune` — Sets that this entity doesn't take damage from fire. Can be an empty object {} or boolean true. */
export const fireImmune = (value: EntityComponents["minecraft:fire_immune"] = {} as EntityComponents["minecraft:fire_immune"]): Component => component("minecraft:fire_immune", value);
/** `minecraft:floats_in_liquid` — Sets that this entity can float in liquid blocks. */
export const floatsInLiquid = (value: EntityComponents["minecraft:floats_in_liquid"] = {} as EntityComponents["minecraft:floats_in_liquid"]): Component => component("minecraft:floats_in_liquid", value);
/** `minecraft:flocking` — Allows entities to flock in groups in water or not. */
export const flocking = (value: EntityComponents["minecraft:flocking"] = {} as EntityComponents["minecraft:flocking"]): Component => component("minecraft:flocking", value);
/** `minecraft:flying_speed` — Speed in Blocks that this entity flies at. */
export const flyingSpeed = (value: EntityComponents["minecraft:flying_speed"] = {} as EntityComponents["minecraft:flying_speed"]): Component => component("minecraft:flying_speed", value);
/** `minecraft:follow_range` — Defines the maximum range, in blocks, that a mob will pursue a target. This affects AI behaviors like chasing players or attacking. */
export const followRange = (value: EntityComponents["minecraft:follow_range"] = {} as EntityComponents["minecraft:follow_range"]): Component => component("minecraft:follow_range", value);
/** `minecraft:friction_modifier` — Defines how much friction affects this entity. */
export const frictionModifier = (value: EntityComponents["minecraft:friction_modifier"] = {} as EntityComponents["minecraft:friction_modifier"]): Component => component("minecraft:friction_modifier", value);
/** `minecraft:game_event_movement_tracking` — Allows an entity to emit `entityMove`, `swim` and `flap` game events, depending on the block the entity is moving through. It is added by default to every mob. Add it again to override its behavior. */
export const gameEventMovementTracking = (value: EntityComponents["minecraft:game_event_movement_tracking"] = {} as EntityComponents["minecraft:game_event_movement_tracking"]): Component => component("minecraft:game_event_movement_tracking", value);
/** `minecraft:genetics` — Defines the way a mob's genes and alleles are passed on to its offspring, and how those traits manifest in the child. Compatible parent genes are crossed together, the alleles are handed down from the parents to the child, and any matching genetic variants fire off JSON events to modify the child and express the traits. */
export const genetics = (value: EntityComponents["minecraft:genetics"] = {} as EntityComponents["minecraft:genetics"]): Component => component("minecraft:genetics", value);
/** `minecraft:giveable` — Defines sets of items that can be used to trigger events when used on this entity. The item will also be taken and placed in the entity's inventory. */
export const giveable = (value: EntityComponents["minecraft:giveable"] = {} as EntityComponents["minecraft:giveable"]): Component => component("minecraft:giveable", value);
/** `minecraft:ground_offset` — Sets the offset from the ground that the entity is actually at. */
export const groundOffset = (value: EntityComponents["minecraft:ground_offset"] = {} as EntityComponents["minecraft:ground_offset"]): Component => component("minecraft:ground_offset", value);
/** `minecraft:group_size` — Keeps track of entity group size in the given radius. */
export const groupSize = (value: EntityComponents["minecraft:group_size"] = {} as EntityComponents["minecraft:group_size"]): Component => component("minecraft:group_size", value);
/** `minecraft:grows_crop` — Could increase crop growth when entity walks over crop */
export const growsCrop = (value: EntityComponents["minecraft:grows_crop"] = {} as EntityComponents["minecraft:grows_crop"]): Component => component("minecraft:grows_crop", value);
/** `minecraft:healable` — How entities heal */
export const healable = (value: EntityComponents["minecraft:healable"] = {} as EntityComponents["minecraft:healable"]): Component => component("minecraft:healable", value);
/** `minecraft:health` — Defines the health pool for an entity, measured in health points (1 point = half a heart). Typical values: cow (10), zombie (20), iron golem (100), wither (600). */
export const health = (value: EntityComponents["minecraft:health"] = {} as EntityComponents["minecraft:health"]): Component => component("minecraft:health", value);
/** `minecraft:heartbeat` — Defines the entity's heartbeat. */
export const heartbeat = (value: EntityComponents["minecraft:heartbeat"] = {} as EntityComponents["minecraft:heartbeat"]): Component => component("minecraft:heartbeat", value);
/** `minecraft:hide` — Moves to and hides at their owned POI or the closest nearby. */
export const hide = (value: EntityComponents["minecraft:hide"] = {} as EntityComponents["minecraft:hide"]): Component => component("minecraft:hide", value);
/** `minecraft:home` — Saves a home position for when the entity is spawned. This component allows entities like bees to remember and return to a specific location such as a hive or nest. */
export const home = (value: EntityComponents["minecraft:home"] = {} as EntityComponents["minecraft:home"]): Component => component("minecraft:home", value);
/** `minecraft:horse.jump_strength` — Determines the jump height for a horse or similar entity, like a donkey. */
export const horseJumpStrength = (value: EntityComponents["minecraft:horse.jump_strength"] = {} as EntityComponents["minecraft:horse.jump_strength"]): Component => component("minecraft:horse.jump_strength", value);
/** `minecraft:hurt_on_condition` — Defines a set of conditions under which an entity should take damage. */
export const hurtOnCondition = (value: EntityComponents["minecraft:hurt_on_condition"] = {} as EntityComponents["minecraft:hurt_on_condition"]): Component => component("minecraft:hurt_on_condition", value);
/** `minecraft:ignore_cannot_be_attacked` — Allows the owner entity to ignore the "minecraft:cannot_be_attacked" component on entities that fulfill the filter. */
export const ignoreCannotBeAttacked = (value: EntityComponents["minecraft:ignore_cannot_be_attacked"] = {} as EntityComponents["minecraft:ignore_cannot_be_attacked"]): Component => component("minecraft:ignore_cannot_be_attacked", value);
/** `minecraft:input_air_controlled` — When configured as a rideable entity, the entity will be controlled using WASD controls and mouse to move in three dimensions. */
export const inputAirControlled = (value: EntityComponents["minecraft:input_air_controlled"] = {} as EntityComponents["minecraft:input_air_controlled"]): Component => component("minecraft:input_air_controlled", value);
/** `minecraft:input_ground_controlled` — When configured as a rideable entity, the entity will be controlled using WASD controls. Beginning with 1.19.50 the default auto step height for rideable entities is half a block. Consider adding the "minecraft:variable_max_auto_step" component to increase it. */
export const inputGroundControlled = (value: EntityComponents["minecraft:input_ground_controlled"] = {} as EntityComponents["minecraft:input_ground_controlled"]): Component => component("minecraft:input_ground_controlled", value);
/** `minecraft:inside_block_notifier` — Verifies whether the entity is inside any of the listed blocks. */
export const insideBlockNotifier = (value: EntityComponents["minecraft:inside_block_notifier"] = {} as EntityComponents["minecraft:inside_block_notifier"]): Component => component("minecraft:inside_block_notifier", value);
/** `minecraft:insomnia` — Adds a timer since last rested to see if phantoms should spawn. */
export const insomnia = (value: EntityComponents["minecraft:insomnia"] = {} as EntityComponents["minecraft:insomnia"]): Component => component("minecraft:insomnia", value);
/** `minecraft:instant_despawn` — Despawns the Actor immediately. */
export const instantDespawn = (value: EntityComponents["minecraft:instant_despawn"] = {} as EntityComponents["minecraft:instant_despawn"]): Component => component("minecraft:instant_despawn", value);
/** `minecraft:interact` — Defines interactions with this entity. */
export const interact = (value: EntityComponents["minecraft:interact"] = {} as EntityComponents["minecraft:interact"]): Component => component("minecraft:interact", value);
/** `minecraft:inventory` — Defines this entity's inventory properties. */
export const inventory = (value: EntityComponents["minecraft:inventory"] = {} as EntityComponents["minecraft:inventory"]): Component => component("minecraft:inventory", value);
/** `minecraft:is_baby` — Sets that this entity is a baby. This is used to set the is_baby value for use in query functions like Molang and Filters. */
export const isBaby = (value: EntityComponents["minecraft:is_baby"] = {} as EntityComponents["minecraft:is_baby"]): Component => component("minecraft:is_baby", value);
/** `minecraft:is_charged` — Sets that this entity is charged. This is used to set the is_charged value for use in query functions like Molang and Filters. */
export const isCharged = (value: EntityComponents["minecraft:is_charged"] = {} as EntityComponents["minecraft:is_charged"]): Component => component("minecraft:is_charged", value);
/** `minecraft:is_chested` — Sets that this entity is currently carrying a chest. */
export const isChested = (value: EntityComponents["minecraft:is_chested"] = {} as EntityComponents["minecraft:is_chested"]): Component => component("minecraft:is_chested", value);
/** `minecraft:is_collidable` — Allows other mobs to have vertical and horizontal collisions with this mob. For a collision to occur, both mobs must have a "minecraft:collision_box" component. This component can only be used on mobs and enables collisions exclusively between mobs.
Please note that this type of collision is unreliable for moving collidable mobs. It is recommended to use this component only in scenarios where the collidable mob remains stationary.
Collidable behavior is closely related to stackable behavior. While the "minecraft:is_collidable" component governs how other mobs interact with the component's owner, the "minecraft:is_stackable" component describes how an entity interacts with others of its own kind. */
export const isCollidable = (value: EntityComponents["minecraft:is_collidable"] = {} as EntityComponents["minecraft:is_collidable"]): Component => component("minecraft:is_collidable", value);
/** `minecraft:is_dyeable` — Allows dyes to be used on this entity to change its color. */
export const isDyeable = (value: EntityComponents["minecraft:is_dyeable"] = {} as EntityComponents["minecraft:is_dyeable"]): Component => component("minecraft:is_dyeable", value);
/** `minecraft:is_hidden_when_invisible` — The entity can hide from hostile mobs while invisible. */
export const isHiddenWhenInvisible = (value: EntityComponents["minecraft:is_hidden_when_invisible"] = {} as EntityComponents["minecraft:is_hidden_when_invisible"]): Component => component("minecraft:is_hidden_when_invisible", value);
/** `minecraft:is_ignited` — Sets that this entity is currently on fire. */
export const isIgnited = (value: EntityComponents["minecraft:is_ignited"] = {} as EntityComponents["minecraft:is_ignited"]): Component => component("minecraft:is_ignited", value);
/** `minecraft:is_illager_captain` — Sets that this entity is an Illager Captain. */
export const isIllagerCaptain = (value: EntityComponents["minecraft:is_illager_captain"] = {} as EntityComponents["minecraft:is_illager_captain"]): Component => component("minecraft:is_illager_captain", value);
/** `minecraft:is_pregnant` — Sets that this entity is currently pregnant. */
export const isPregnant = (value: EntityComponents["minecraft:is_pregnant"] = {} as EntityComponents["minecraft:is_pregnant"]): Component => component("minecraft:is_pregnant", value);
/** `minecraft:is_saddled` — Sets that this entity is currently saddled. */
export const isSaddled = (value: EntityComponents["minecraft:is_saddled"] = {} as EntityComponents["minecraft:is_saddled"]): Component => component("minecraft:is_saddled", value);
/** `minecraft:is_shaking` — Sets that this entity is currently shaking. */
export const isShaking = (value: EntityComponents["minecraft:is_shaking"] = {} as EntityComponents["minecraft:is_shaking"]): Component => component("minecraft:is_shaking", value);
/** `minecraft:is_sheared` — Sets that this entity is currently sheared. */
export const isSheared = (value: EntityComponents["minecraft:is_sheared"] = {} as EntityComponents["minecraft:is_sheared"]): Component => component("minecraft:is_sheared", value);
/** `minecraft:is_stackable` — Allows instances of this entity to have vertical and horizontal collisions with each other. For a collision to occur, both instances must have a "minecraft:collision_box" component.
Stackable behavior is closely related to collidable behavior. While the "minecraft:is_stackable" component describes how an entity interacts with others of its own kind, the "minecraft:is_collidable" component governs how other mobs interact with the component's owner. */
export const isStackable = (value: EntityComponents["minecraft:is_stackable"] = {} as EntityComponents["minecraft:is_stackable"]): Component => component("minecraft:is_stackable", value);
/** `minecraft:is_stunned` — Sets that this entity is currently stunned. */
export const isStunned = (value: EntityComponents["minecraft:is_stunned"] = {} as EntityComponents["minecraft:is_stunned"]): Component => component("minecraft:is_stunned", value);
/** `minecraft:is_tamed` — Sets that this entity is currently tamed. */
export const isTamed = (value: EntityComponents["minecraft:is_tamed"] = {} as EntityComponents["minecraft:is_tamed"]): Component => component("minecraft:is_tamed", value);
/** `minecraft:item_controllable` — Defines what items can be used to control this entity while ridden. */
export const itemControllable = (value: EntityComponents["minecraft:item_controllable"] = {} as EntityComponents["minecraft:item_controllable"]): Component => component("minecraft:item_controllable", value);
/** `minecraft:item_hopper` — Determines that this entity is an item hopper. */
export const itemHopper = (value: EntityComponents["minecraft:item_hopper"] = {} as EntityComponents["minecraft:item_hopper"]): Component => component("minecraft:item_hopper", value);
/** `minecraft:jump.dynamic` — Defines a dynamic type jump control that will change jump properties based on the speed modifier of the mob.Requires `minecraft:movement.skip` to be used. */
export const jumpDynamic = (value: EntityComponents["minecraft:jump.dynamic"] = {} as EntityComponents["minecraft:jump.dynamic"]): Component => component("minecraft:jump.dynamic", value);
/** `minecraft:jump.static` — Gives the entity the ability to jump. */
export const jumpStatic = (value: EntityComponents["minecraft:jump.static"] = {} as EntityComponents["minecraft:jump.static"]): Component => component("minecraft:jump.static", value);
/** `minecraft:knockback_resistance` — Determines an entity's resistance to knockback from melee attacks. A value of 0.0 means no resistance, while 1.0 provides full immunity to knockback (like iron golems). */
export const knockbackResistance = (value: EntityComponents["minecraft:knockback_resistance"] = {} as EntityComponents["minecraft:knockback_resistance"]): Component => component("minecraft:knockback_resistance", value);
/** `minecraft:lava_movement` — Allows a custom movement speed across lava blocks. */
export const lavaMovement = (value: EntityComponents["minecraft:lava_movement"] = {} as EntityComponents["minecraft:lava_movement"]): Component => component("minecraft:lava_movement", value);
/** `minecraft:leashable` — Describes how this mob can be leashed to other items */
export const leashable = (value: EntityComponents["minecraft:leashable"] = {} as EntityComponents["minecraft:leashable"]): Component => component("minecraft:leashable", value);
/** `minecraft:leashable_to` — Allows players to leash entities to this entity, retrieve entities already leashed to it, or free them using shears. For the last interaction to work, the leashed entities must have "can_be_cut" set to true in their "minecraft:leashable" component. */
export const leashableTo = (value: EntityComponents["minecraft:leashable_to"] = {} as EntityComponents["minecraft:leashable_to"]): Component => component("minecraft:leashable_to", value);
/** `minecraft:looked_at` — Defines the behavior when another entity looks at the owner entity. */
export const lookedAt = (value: EntityComponents["minecraft:looked_at"] = {} as EntityComponents["minecraft:looked_at"]): Component => component("minecraft:looked_at", value);
/** `minecraft:loot` — Specifies the loot table that determines what items this entity drops upon death. The table path is relative to the behavior pack's root folder. */
export const loot = (value: EntityComponents["minecraft:loot"] = {} as EntityComponents["minecraft:loot"]): Component => component("minecraft:loot", value);
/** `minecraft:luck` — Minecraft Luck */
export const luck = (value: EntityComponents["minecraft:luck"] = {} as EntityComponents["minecraft:luck"]): Component => component("minecraft:luck", value);
/** `minecraft:managed_wandering_trader` — Manages the entity's ability to trade. */
export const managedWanderingTrader = (value: EntityComponents["minecraft:managed_wandering_trader"] = {} as EntityComponents["minecraft:managed_wandering_trader"]): Component => component("minecraft:managed_wandering_trader", value);
/** `minecraft:mark_variant` — Mark Variant is typically used as an additional per-type way (besides `variant`) to express a different visual form of the same mob. */
export const markVariant = (value: EntityComponents["minecraft:mark_variant"] = {} as EntityComponents["minecraft:mark_variant"]): Component => component("minecraft:mark_variant", value);
/** `minecraft:mob_effect` — A component that applies a mob effect to entities that get within range. */
export const mobEffect = (value: EntityComponents["minecraft:mob_effect"] = {} as EntityComponents["minecraft:mob_effect"]): Component => component("minecraft:mob_effect", value);
/** `minecraft:mob_effect_immunity` — Entities with this component will have an immunity to the provided mob effects. */
export const mobEffectImmunity = (value: EntityComponents["minecraft:mob_effect_immunity"] = {} as EntityComponents["minecraft:mob_effect_immunity"]): Component => component("minecraft:mob_effect_immunity", value);
/** `minecraft:movement` — Defines the base movement speed of an entity. Typical values: creeper (0.2), cow (0.25), zombie baby (0.35). */
export const movement = (value: EntityComponents["minecraft:movement"] = {} as EntityComponents["minecraft:movement"]): Component => component("minecraft:movement", value);
/** `minecraft:movement.amphibious` — This move control allows the mob to swim in water and walk on land. */
export const movementAmphibious = (value: EntityComponents["minecraft:movement.amphibious"] = {} as EntityComponents["minecraft:movement.amphibious"]): Component => component("minecraft:movement.amphibious", value);
/** `minecraft:movement.basic` — This component accents the movement of an entity. */
export const movementBasic = (value: EntityComponents["minecraft:movement.basic"] = {} as EntityComponents["minecraft:movement.basic"]): Component => component("minecraft:movement.basic", value);
/** `minecraft:movement.dolphin` — This component can control how dolphins move, in a dolphin-esque style. */
export const movementDolphin = (value: EntityComponents["minecraft:movement.dolphin"] = {} as EntityComponents["minecraft:movement.dolphin"]): Component => component("minecraft:movement.dolphin", value);
/** `minecraft:movement.fly` — This move control causes the mob to fly. */
export const movementFly = (value: EntityComponents["minecraft:movement.fly"] = {} as EntityComponents["minecraft:movement.fly"]): Component => component("minecraft:movement.fly", value);
/** `minecraft:movement.generic` — This move control allows a mob to fly, swim, climb, etc. */
export const movementGeneric = (value: EntityComponents["minecraft:movement.generic"] = {} as EntityComponents["minecraft:movement.generic"]): Component => component("minecraft:movement.generic", value);
/** `minecraft:movement.glide` — This move control causes the mob to glide. */
export const movementGlide = (value: EntityComponents["minecraft:movement.glide"] = {} as EntityComponents["minecraft:movement.glide"]): Component => component("minecraft:movement.glide", value);
/** `minecraft:movement.hover` — This move control causes the mob to hover. */
export const movementHover = (value: EntityComponents["minecraft:movement.hover"] = {} as EntityComponents["minecraft:movement.hover"]): Component => component("minecraft:movement.hover", value);
/** `minecraft:movement.jump` — Move control that causes the mob to jump as it moves with a specified delay between jumps. */
export const movementJump = (value: EntityComponents["minecraft:movement.jump"] = {} as EntityComponents["minecraft:movement.jump"]): Component => component("minecraft:movement.jump", value);
/** `minecraft:movement.skip` — This move control causes the mob to hop as it moves. */
export const movementSkip = (value: EntityComponents["minecraft:movement.skip"] = {} as EntityComponents["minecraft:movement.skip"]): Component => component("minecraft:movement.skip", value);
/** `minecraft:movement.sway` — This move control causes the mob to sway side to side giving the impression it is swimming. */
export const movementSway = (value: EntityComponents["minecraft:movement.sway"] = {} as EntityComponents["minecraft:movement.sway"]): Component => component("minecraft:movement.sway", value);
/** `minecraft:movement_sound_distance_offset` — Sets the offset used to determine the next step distance for playing a movement sound. */
export const movementSoundDistanceOffset = (value: EntityComponents["minecraft:movement_sound_distance_offset"] = {} as EntityComponents["minecraft:movement_sound_distance_offset"]): Component => component("minecraft:movement_sound_distance_offset", value);
/** `minecraft:nameable` — Allows this entity to be named (e.g. using a name tag). */
export const nameable = (value: EntityComponents["minecraft:nameable"] = {} as EntityComponents["minecraft:nameable"]): Component => component("minecraft:nameable", value);
/** `minecraft:navigation.climb` — Allows this entity to generate paths that include vertical walls like the vanilla Spiders do. */
export const navigationClimb = (value: EntityComponents["minecraft:navigation.climb"] = {} as EntityComponents["minecraft:navigation.climb"]): Component => component("minecraft:navigation.climb", value);
/** `minecraft:navigation.float` — Allows this entity to generate paths by flying around the air like the regular Ghast. */
export const navigationFloat = (value: EntityComponents["minecraft:navigation.float"] = {} as EntityComponents["minecraft:navigation.float"]): Component => component("minecraft:navigation.float", value);
/** `minecraft:navigation.fly` — Allows this entity to generate paths in the air like the vanilla Parrots do. */
export const navigationFly = (value: EntityComponents["minecraft:navigation.fly"] = {} as EntityComponents["minecraft:navigation.fly"]): Component => component("minecraft:navigation.fly", value);
/** `minecraft:navigation.generic` — Allows this entity to generate paths by walking, swimming, flying and/or climbing around and jumping up and down a block. */
export const navigationGeneric = (value: EntityComponents["minecraft:navigation.generic"] = {} as EntityComponents["minecraft:navigation.generic"]): Component => component("minecraft:navigation.generic", value);
/** `minecraft:navigation.hover` — Allows this entity to generate paths in the air like the vanilla Bees do. Keeps them from falling out of the skies and doing predictive movement. */
export const navigationHover = (value: EntityComponents["minecraft:navigation.hover"] = {} as EntityComponents["minecraft:navigation.hover"]): Component => component("minecraft:navigation.hover", value);
/** `minecraft:navigation.swim` — Allows this entity to generate paths that include water. */
export const navigationSwim = (value: EntityComponents["minecraft:navigation.swim"] = {} as EntityComponents["minecraft:navigation.swim"]): Component => component("minecraft:navigation.swim", value);
/** `minecraft:navigation.walk` — Walking style of the mob */
export const navigationWalk = (value: EntityComponents["minecraft:navigation.walk"] = {} as EntityComponents["minecraft:navigation.walk"]): Component => component("minecraft:navigation.walk", value);
/** `minecraft:npc` — Minecraft Npc */
export const npc = (value: EntityComponents["minecraft:npc"] = {} as EntityComponents["minecraft:npc"]): Component => component("minecraft:npc", value);
/** `minecraft:on_death` — Adds a trigger to call on this entity's death. */
export const onDeath = (value: EntityComponents["minecraft:on_death"] = {} as EntityComponents["minecraft:on_death"]): Component => component("minecraft:on_death", value);
/** `minecraft:on_friendly_anger` — Adds a trigger that will run when a nearby entity of the same type as this entity becomes Angry. */
export const onFriendlyAnger = (value: EntityComponents["minecraft:on_friendly_anger"] = {} as EntityComponents["minecraft:on_friendly_anger"]): Component => component("minecraft:on_friendly_anger", value);
/** `minecraft:on_hurt` — Adds a trigger to call when this entity takes damage. */
export const onHurt = (value: EntityComponents["minecraft:on_hurt"] = {} as EntityComponents["minecraft:on_hurt"]): Component => component("minecraft:on_hurt", value);
/** `minecraft:on_hurt_by_player` — Adds a trigger to call when this entity is attacked by the player. */
export const onHurtByPlayer = (value: EntityComponents["minecraft:on_hurt_by_player"] = {} as EntityComponents["minecraft:on_hurt_by_player"]): Component => component("minecraft:on_hurt_by_player", value);
/** `minecraft:on_ignite` — Adds a trigger to call when this entity is set on fire. */
export const onIgnite = (value: EntityComponents["minecraft:on_ignite"] = {} as EntityComponents["minecraft:on_ignite"]): Component => component("minecraft:on_ignite", value);
/** `minecraft:on_start_landing` — Only usable by the Ender Dragon. Adds a trigger to call when this entity lands. */
export const onStartLanding = (value: EntityComponents["minecraft:on_start_landing"] = {} as EntityComponents["minecraft:on_start_landing"]): Component => component("minecraft:on_start_landing", value);
/** `minecraft:on_start_takeoff` — Only usable by the Ender Dragon. Adds a trigger to call when this entity starts flying. */
export const onStartTakeoff = (value: EntityComponents["minecraft:on_start_takeoff"] = {} as EntityComponents["minecraft:on_start_takeoff"]): Component => component("minecraft:on_start_takeoff", value);
/** `minecraft:on_target_acquired` — Adds a trigger to call when this entity finds a target. */
export const onTargetAcquired = (value: EntityComponents["minecraft:on_target_acquired"] = {} as EntityComponents["minecraft:on_target_acquired"]): Component => component("minecraft:on_target_acquired", value);
/** `minecraft:on_target_escape` — Adds a trigger to call when this entity loses the target it currently has. */
export const onTargetEscape = (value: EntityComponents["minecraft:on_target_escape"] = {} as EntityComponents["minecraft:on_target_escape"]): Component => component("minecraft:on_target_escape", value);
/** `minecraft:on_wake_with_owner` — A trigger when a mob's tamed onwer wakes up. */
export const onWakeWithOwner = (value: EntityComponents["minecraft:on_wake_with_owner"] = {} as EntityComponents["minecraft:on_wake_with_owner"]): Component => component("minecraft:on_wake_with_owner", value);
/** `minecraft:out_of_control` — Defines the entity's 'out of control' state. */
export const outOfControl = (value: EntityComponents["minecraft:out_of_control"] = {} as EntityComponents["minecraft:out_of_control"]): Component => component("minecraft:out_of_control", value);
/** `minecraft:peek` — Defines the entity's 'peek' behavior, defining the events that should be called during it. */
export const peek = (value: EntityComponents["minecraft:peek"] = {} as EntityComponents["minecraft:peek"]): Component => component("minecraft:peek", value);
/** `minecraft:persistent` — Defines whether an entity should be persistent in the game world. */
export const persistent = (value: EntityComponents["minecraft:persistent"] = {} as EntityComponents["minecraft:persistent"]): Component => component("minecraft:persistent", value);
/** `minecraft:physics` — Defines physics properties of an actor, including if it is affected by gravity or if it collides with objects. */
export const physics = (value: EntityComponents["minecraft:physics"] = {} as EntityComponents["minecraft:physics"]): Component => component("minecraft:physics", value);
/** `minecraft:player.exhaustion` — Defines the player's exhaustion level. */
export const playerExhaustion = (value: EntityComponents["minecraft:player.exhaustion"] = {} as EntityComponents["minecraft:player.exhaustion"]): Component => component("minecraft:player.exhaustion", value);
/** `minecraft:player.experience` — Defines how much experience each player action should take. */
export const playerExperience = (value: EntityComponents["minecraft:player.experience"] = {} as EntityComponents["minecraft:player.experience"]): Component => component("minecraft:player.experience", value);
/** `minecraft:player.hunger` — Hunger Minecraft Player */
export const playerHunger = (value: EntityComponents["minecraft:player.hunger"] = {} as EntityComponents["minecraft:player.hunger"]): Component => component("minecraft:player.hunger", value);
/** `minecraft:player.level` — Defines the player's level. */
export const playerLevel = (value: EntityComponents["minecraft:player.level"] = {} as EntityComponents["minecraft:player.level"]): Component => component("minecraft:player.level", value);
/** `minecraft:player.saturation` — Defines the player's need for food. */
export const playerSaturation = (value: EntityComponents["minecraft:player.saturation"] = {} as EntityComponents["minecraft:player.saturation"]): Component => component("minecraft:player.saturation", value);
/** `minecraft:preferred_path` — Specifies costing information for mobs that prefer to walk on preferred paths. */
export const preferredPath = (value: EntityComponents["minecraft:preferred_path"] = {} as EntityComponents["minecraft:preferred_path"]): Component => component("minecraft:preferred_path", value);
/** `minecraft:projectile` — Turns the entity into a projectile: a thrown or shot entity that flies along a ballistic arc and reacts when it impacts a block, a fluid, or another entity. */
export const projectile = (value: EntityComponents["minecraft:projectile"] = {} as EntityComponents["minecraft:projectile"]): Component => component("minecraft:projectile", value);
/** `minecraft:push_through` — Sets the distance through which the entity can push through. */
export const pushThrough = (value: EntityComponents["minecraft:push_through"] = {} as EntityComponents["minecraft:push_through"]): Component => component("minecraft:push_through", value);
/** `minecraft:pushable` — Defines what can push an entity between other entities and pistons. */
export const pushable = (value: EntityComponents["minecraft:pushable"] = {} as EntityComponents["minecraft:pushable"]): Component => component("minecraft:pushable", value);
/** `minecraft:raid_trigger` — Attempts to trigger a raid at the entity's location. */
export const raidTrigger = (value: EntityComponents["minecraft:raid_trigger"] = {} as EntityComponents["minecraft:raid_trigger"]): Component => component("minecraft:raid_trigger", value);
/** `minecraft:rail_movement` — Defines the entity's movement on the rails. An entity with this component is only allowed to move on the rail. */
export const railMovement = (value: EntityComponents["minecraft:rail_movement"] = {} as EntityComponents["minecraft:rail_movement"]): Component => component("minecraft:rail_movement", value);
/** `minecraft:rail_sensor` — Enables minecart-type entities to detect powered rails and respond to activation state changes. Triggers events when the entity passes over activated or deactivated rails, enabling custom minecart behaviors like launching at boosted speed, stopping at braking rails, or triggering special effects at detector rails. */
export const railSensor = (value: EntityComponents["minecraft:rail_sensor"] = {} as EntityComponents["minecraft:rail_sensor"]): Component => component("minecraft:rail_sensor", value);
/** `minecraft:ravager_blocked` — Defines the ravager's response to their melee attack being blocked. */
export const ravagerBlocked = (value: EntityComponents["minecraft:ravager_blocked"] = {} as EntityComponents["minecraft:ravager_blocked"]): Component => component("minecraft:ravager_blocked", value);
/** `minecraft:reflect_projectiles` — [EXPERIMENTAL] Allows an entity to reflect projectiles. */
export const reflectProjectiles = (value: EntityComponents["minecraft:reflect_projectiles"] = {} as EntityComponents["minecraft:reflect_projectiles"]): Component => component("minecraft:reflect_projectiles", value);
/** `minecraft:renders_when_invisible` — When set, the entity will render even when invisible. Appropriate rendering behavior can then be specified in the corresponding "minecraft:client_entity". */
export const rendersWhenInvisible = (value: EntityComponents["minecraft:renders_when_invisible"] = {} as EntityComponents["minecraft:renders_when_invisible"]): Component => component("minecraft:renders_when_invisible", value);
/** `minecraft:rideable` — This entity can be ridden */
export const rideable = (value: EntityComponents["minecraft:rideable"] = {} as EntityComponents["minecraft:rideable"]): Component => component("minecraft:rideable", value);
/** `minecraft:rotation_axis_aligned` — Causes the entity to automatically rotate to align with the nearest cardinal direction based on its current facing direction.
Combining this with the "minecraft:body_rotation_blocked" component will cause the entity's body to align with the nearest cardinal direction and remain fixed in that orientation, regardless of changes in its facing direction. */
export const rotationAxisAligned = (value: EntityComponents["minecraft:rotation_axis_aligned"] = {} as EntityComponents["minecraft:rotation_axis_aligned"]): Component => component("minecraft:rotation_axis_aligned", value);
/** `minecraft:scale` — Sets the entity's visual size multiplier. A value of 1.0 means normal size, 0.5 is half size (commonly used for baby mobs), and values above 1.0 make the entity larger. */
export const scale = (value: EntityComponents["minecraft:scale"] = {} as EntityComponents["minecraft:scale"]): Component => component("minecraft:scale", value);
/** `minecraft:scale_by_age` — Defines the entity's size interpolation based on the entity's age. */
export const scaleByAge = (value: EntityComponents["minecraft:scale_by_age"] = {} as EntityComponents["minecraft:scale_by_age"]): Component => component("minecraft:scale_by_age", value);
/** `minecraft:scheduler` — Fires off scheduled mob events at time of day events. */
export const scheduler = (value: EntityComponents["minecraft:scheduler"] = {} as EntityComponents["minecraft:scheduler"]): Component => component("minecraft:scheduler", value);
/** `minecraft:shareables` — Defines a list of items the mob wants to share or pick up. Items can be configured with optional parameters to control pickup, sharing, and inventory behavior. */
export const shareables = (value: EntityComponents["minecraft:shareables"] = {} as EntityComponents["minecraft:shareables"]): Component => component("minecraft:shareables", value);
/** `minecraft:shooter` — Defines the entity's ranged attack behavior. The "minecraft:behavior.ranged_attack" goal uses this component to determine which projectiles to shoot. */
export const shooter = (value: EntityComponents["minecraft:shooter"] = {} as EntityComponents["minecraft:shooter"]): Component => component("minecraft:shooter", value);
/** `minecraft:sittable` — Defines the entity's 'sit' state. */
export const sittable = (value: EntityComponents["minecraft:sittable"] = {} as EntityComponents["minecraft:sittable"]): Component => component("minecraft:sittable", value);
/** `minecraft:skin_id` — Skin ID value. Can be used to differentiate skins, such as base skins for villagers. */
export const skinId = (value: EntityComponents["minecraft:skin_id"] = {} as EntityComponents["minecraft:skin_id"]): Component => component("minecraft:skin_id", value);
/** `minecraft:sound_volume` — Sets the entity's base volume for sound effects. */
export const soundVolume = (value: EntityComponents["minecraft:sound_volume"] = {} as EntityComponents["minecraft:sound_volume"]): Component => component("minecraft:sound_volume", value);
/** `minecraft:spawn_entity` — Adds a timer after which this entity will spawn another entity or item (similar to vanilla's chicken's egg-laying behavior). */
export const spawnEntity = (value: EntityComponents["minecraft:spawn_entity"] = {} as EntityComponents["minecraft:spawn_entity"]): Component => component("minecraft:spawn_entity", value);
/** `minecraft:spell_effects` — Allows an entity to add or remove status effects from itself. Similarly to `addrider`, this component performs a one-time operation on the entity when added. Removing the component will not change the entity's current effects. Adding different versions of the component multiple times will perform each one in turn. Once the component has been added, it will not provide any further functionality. There is one exception to this behavior: if this component is present on a player, its effects will be re-applied every time the player enters the world. To avoid this, remove the component shortly after adding it, or add an empty component to replace it. */
export const spellEffects = (value: EntityComponents["minecraft:spell_effects"] = {} as EntityComponents["minecraft:spell_effects"]): Component => component("minecraft:spell_effects", value);
/** `minecraft:strength` — Defines the entity's strength to carry items. */
export const strength = (value: EntityComponents["minecraft:strength"] = {} as EntityComponents["minecraft:strength"]): Component => component("minecraft:strength", value);
/** `minecraft:suspect_tracking` — Allows this entity to remember suspicious locations. */
export const suspectTracking = (value: EntityComponents["minecraft:suspect_tracking"] = {} as EntityComponents["minecraft:suspect_tracking"]): Component => component("minecraft:suspect_tracking", value);
/** `minecraft:tameable` — This entity can be tamed */
export const tameable = (value: EntityComponents["minecraft:tameable"] = {} as EntityComponents["minecraft:tameable"]): Component => component("minecraft:tameable", value);
/** `minecraft:tamemount` — Allows entities to flock in groups in water or not. */
export const tamemount = (value: EntityComponents["minecraft:tamemount"] = {} as EntityComponents["minecraft:tamemount"]): Component => component("minecraft:tamemount", value);
/** `minecraft:target_nearby_sensor` — Defines the entity's range within which it can see or sense other entities to target them. */
export const targetNearbySensor = (value: EntityComponents["minecraft:target_nearby_sensor"] = {} as EntityComponents["minecraft:target_nearby_sensor"]): Component => component("minecraft:target_nearby_sensor", value);
/** `minecraft:teleport` — Defines an entity's teleporting behavior. */
export const teleport = (value: EntityComponents["minecraft:teleport"] = {} as EntityComponents["minecraft:teleport"]): Component => component("minecraft:teleport", value);
/** `minecraft:tick_world` — Defines if the entity ticks the world and the radius around it to tick. */
export const tickWorld = (value: EntityComponents["minecraft:tick_world"] = {} as EntityComponents["minecraft:tick_world"]): Component => component("minecraft:tick_world", value);
/** `minecraft:timer` — Adds a timer after which an event will fire. */
export const timer = (value: EntityComponents["minecraft:timer"] = {} as EntityComponents["minecraft:timer"]): Component => component("minecraft:timer", value);
/** `minecraft:trade_resupply` — Resupplies an entity's trade. */
export const tradeResupply = (value: EntityComponents["minecraft:trade_resupply"] = {} as EntityComponents["minecraft:trade_resupply"]): Component => component("minecraft:trade_resupply", value);
/** `minecraft:trade_table` — Defines this entity's ability to trade with players. */
export const tradeTable = (value: EntityComponents["minecraft:trade_table"] = {} as EntityComponents["minecraft:trade_table"]): Component => component("minecraft:trade_table", value);
/** `minecraft:trail` — Causes an entity to leave a trail of blocks as it moves about the world. */
export const trail = (value: EntityComponents["minecraft:trail"] = {} as EntityComponents["minecraft:trail"]): Component => component("minecraft:trail", value);
/** `minecraft:transformation` — Defines an entity's transformation from the current definition into another */
export const transformation = (value: EntityComponents["minecraft:transformation"] = {} as EntityComponents["minecraft:transformation"]): Component => component("minecraft:transformation", value);
/** `minecraft:transient` — An entity with this component will NEVER persist, and forever disappear when unloaded. */
export const transient = (value: EntityComponents["minecraft:transient"] = {} as EntityComponents["minecraft:transient"]): Component => component("minecraft:transient", value);
/** `minecraft:trust` — Allows this entity to trust multiple players. */
export const trust = (value: EntityComponents["minecraft:trust"] = {} as EntityComponents["minecraft:trust"]): Component => component("minecraft:trust", value);
/** `minecraft:trusting` — Defines the rules for a mob to trust players. */
export const trusting = (value: EntityComponents["minecraft:trusting"] = {} as EntityComponents["minecraft:trusting"]): Component => component("minecraft:trusting", value);
/** `minecraft:type_family` — Defines the family categories this entity belongs to. Type families are used by filters and other game systems to group entities (e.g., 'mob', 'monster', 'undead', 'zombie'). */
export const typeFamily = (value: EntityComponents["minecraft:type_family"] = {} as EntityComponents["minecraft:type_family"]): Component => component("minecraft:type_family", value);
/** `minecraft:underwater_movement` — Defines the speed with which an entity can move through water. */
export const underwaterMovement = (value: EntityComponents["minecraft:underwater_movement"] = {} as EntityComponents["minecraft:underwater_movement"]): Component => component("minecraft:underwater_movement", value);
/** `minecraft:variable_max_auto_step` — Entities with this component will have a maximum auto step height that is different depending on whether they are on a block that prevents jumping. Incompatible with "runtime_identifier": "minecraft:horse". */
export const variableMaxAutoStep = (value: EntityComponents["minecraft:variable_max_auto_step"] = {} as EntityComponents["minecraft:variable_max_auto_step"]): Component => component("minecraft:variable_max_auto_step", value);
/** `minecraft:variant` — Variant is typically used as a per-type way to express a different visual form of the same mob. For example, for cats, variant is a number that defines the breed of cat. */
export const variant = (value: EntityComponents["minecraft:variant"] = {} as EntityComponents["minecraft:variant"]): Component => component("minecraft:variant", value);
/** `minecraft:vibration_damper` — Vibrations emitted by an entity with this component will be ignored. */
export const vibrationDamper = (value: EntityComponents["minecraft:vibration_damper"] = {} as EntityComponents["minecraft:vibration_damper"]): Component => component("minecraft:vibration_damper", value);
/** `minecraft:vibration_listener` — Allows the entity to listen to vibration events. This is a largely-internal component, that is only supported on the Warden and Allay mobs. */
export const vibrationListener = (value: EntityComponents["minecraft:vibration_listener"] = {} as EntityComponents["minecraft:vibration_listener"]): Component => component("minecraft:vibration_listener", value);
/** `minecraft:walk_animation_speed` — Sets the speed multiplier for this entity's walk animation speed. */
export const walkAnimationSpeed = (value: EntityComponents["minecraft:walk_animation_speed"] = {} as EntityComponents["minecraft:walk_animation_speed"]): Component => component("minecraft:walk_animation_speed", value);
/** `minecraft:wants_jockey` — Sets that this entity wants to become a jockey. */
export const wantsJockey = (value: EntityComponents["minecraft:wants_jockey"] = {} as EntityComponents["minecraft:wants_jockey"]): Component => component("minecraft:wants_jockey", value);
/** `minecraft:water_movement` — Customizes how the entity moves through water by adjusting drag coefficient. Lower values let entities glide through water easily like fish, while higher values create resistance for entities that struggle in water. Essential for aquatic mobs, boats, and any entity needing custom underwater physics. */
export const waterMovement = (value: EntityComponents["minecraft:water_movement"] = {} as EntityComponents["minecraft:water_movement"]): Component => component("minecraft:water_movement", value);
/** `minecraft:wither_target_highest_damage` — Allows the wither to focus its attacks on whichever mob has dealt the most damage to it. */
export const witherTargetHighestDamage = (value: EntityComponents["minecraft:wither_target_highest_damage"] = {} as EntityComponents["minecraft:wither_target_highest_damage"]): Component => component("minecraft:wither_target_highest_damage", value);
/** `minecraft:air_drag_modifier` — Minecraft Air Drag Modifier */
export const airDragModifier = (value: EntityComponents["minecraft:air_drag_modifier"] = {} as EntityComponents["minecraft:air_drag_modifier"]): Component => component("minecraft:air_drag_modifier", value);
/** `minecraft:apply_knockback_rules` — Defines how an entity applies knockback. */
export const applyKnockbackRules = (value: EntityComponents["minecraft:apply_knockback_rules"] = {} as EntityComponents["minecraft:apply_knockback_rules"]): Component => component("minecraft:apply_knockback_rules", value);
/** `minecraft:behavior.aquatic_charge_attack` — Enables an aquatic mob to dash at its target with knockback; includes overshoot and cooldown settings. */
export const behaviorAquaticChargeAttack = (value: EntityComponents["minecraft:behavior.aquatic_charge_attack"] = {} as EntityComponents["minecraft:behavior.aquatic_charge_attack"]): Component => component("minecraft:behavior.aquatic_charge_attack", value);
/** `minecraft:behavior.avoid_block` — Allows this entity to avoid certain blocks. */
export const behaviorAvoidBlock = (value: EntityComponents["minecraft:behavior.avoid_block"] = {} as EntityComponents["minecraft:behavior.avoid_block"]): Component => component("minecraft:behavior.avoid_block", value);
/** `minecraft:behavior.avoid_mob_type` — Allows the entity to run away from other entities that meet the criteria specified. */
export const behaviorAvoidMobType = (value: EntityComponents["minecraft:behavior.avoid_mob_type"] = {} as EntityComponents["minecraft:behavior.avoid_mob_type"]): Component => component("minecraft:behavior.avoid_mob_type", value);
/** `minecraft:behavior.celebrate` — Allows this entity to celebrate surviving a raid by making celebration sounds and jumping. */
export const behaviorCelebrate = (value: EntityComponents["minecraft:behavior.celebrate"] = {} as EntityComponents["minecraft:behavior.celebrate"]): Component => component("minecraft:behavior.celebrate", value);
/** `minecraft:behavior.celebrate_survive` — Allows the player to trade with this mob. When the goal starts, it will stop the mob's navigation. */
export const behaviorCelebrateSurvive = (value: EntityComponents["minecraft:behavior.celebrate_survive"] = {} as EntityComponents["minecraft:behavior.celebrate_survive"]): Component => component("minecraft:behavior.celebrate_survive", value);
/** `minecraft:behavior.charge_attack` — Allows this entity to damage a target by using a running attack. */
export const behaviorChargeAttack = (value: EntityComponents["minecraft:behavior.charge_attack"] = {} as EntityComponents["minecraft:behavior.charge_attack"]): Component => component("minecraft:behavior.charge_attack", value);
/** `minecraft:behavior.charge_held_item` — Allows an entity to charge and use their held item. */
export const behaviorChargeHeldItem = (value: EntityComponents["minecraft:behavior.charge_held_item"] = {} as EntityComponents["minecraft:behavior.charge_held_item"]): Component => component("minecraft:behavior.charge_held_item", value);
/** `minecraft:behavior.circle_around_anchor` — Causes an entity to circle around an anchor point placed near a point or target. */
export const behaviorCircleAroundAnchor = (value: EntityComponents["minecraft:behavior.circle_around_anchor"] = {} as EntityComponents["minecraft:behavior.circle_around_anchor"]): Component => component("minecraft:behavior.circle_around_anchor", value);
/** `minecraft:behavior.controlled_by_player` — Allows the entity to be controlled by a player which is holding the item specified in "minecraft:item_controllable" component's "control_items" field (required). Also requires the "minecraft:movement" component, and the "minecraft:rideable" component. On every tick, the entity will attempt to rotate towards where the player is facing with the control item whilst simultaneously moving forward. */
export const behaviorControlledByPlayer = (value: EntityComponents["minecraft:behavior.controlled_by_player"] = {} as EntityComponents["minecraft:behavior.controlled_by_player"]): Component => component("minecraft:behavior.controlled_by_player", value);
/** `minecraft:behavior.croak` — Allows the entity to croak at a random time interval with configurable conditions. */
export const behaviorCroak = (value: EntityComponents["minecraft:behavior.croak"] = {} as EntityComponents["minecraft:behavior.croak"]): Component => component("minecraft:behavior.croak", value);
/** `minecraft:behavior.defend_village_target` — Allows the entity to stay in a village and defend the village from aggressors. If a player is in bad standing with the village this goal will cause the entity to attack the player regardless of filter conditions. */
export const behaviorDefendVillageTarget = (value: EntityComponents["minecraft:behavior.defend_village_target"] = {} as EntityComponents["minecraft:behavior.defend_village_target"]): Component => component("minecraft:behavior.defend_village_target", value);
/** `minecraft:behavior.delayed_attack` — Allows an entity to attack, while also delaying the damage-dealt until a specific time in the attack animation. */
export const behaviorDelayedAttack = (value: EntityComponents["minecraft:behavior.delayed_attack"] = {} as EntityComponents["minecraft:behavior.delayed_attack"]): Component => component("minecraft:behavior.delayed_attack", value);
/** `minecraft:behavior.dig` — Allows this entity to dig into the ground before despawning. */
export const behaviorDig = (value: EntityComponents["minecraft:behavior.dig"] = {} as EntityComponents["minecraft:behavior.dig"]): Component => component("minecraft:behavior.dig", value);
/** `minecraft:behavior.dragonchargeplayer` — Allows this entity to attack a player by charging at them. The player is chosen by the "minecraft:behavior.dragonscanning". Can only be used by the Ender Dragon. */
export const behaviorDragonchargeplayer = (value: EntityComponents["minecraft:behavior.dragonchargeplayer"] = {} as EntityComponents["minecraft:behavior.dragonchargeplayer"]): Component => component("minecraft:behavior.dragonchargeplayer", value);
/** `minecraft:behavior.dragonflaming` — Allows this entity to use a flame-breath attack. Can only be used by the Ender Dragon. */
export const behaviorDragonflaming = (value: EntityComponents["minecraft:behavior.dragonflaming"] = {} as EntityComponents["minecraft:behavior.dragonflaming"]): Component => component("minecraft:behavior.dragonflaming", value);
/** `minecraft:behavior.dragonstrafeplayer` — Allows this entity to fly around looking for a player to shoot fireballs at. Can only be used by the Ender Dragon. */
export const behaviorDragonstrafeplayer = (value: EntityComponents["minecraft:behavior.dragonstrafeplayer"] = {} as EntityComponents["minecraft:behavior.dragonstrafeplayer"]): Component => component("minecraft:behavior.dragonstrafeplayer", value);
/** `minecraft:behavior.drink_milk` — Allows the mob to drink milk based on specified environment conditions. */
export const behaviorDrinkMilk = (value: EntityComponents["minecraft:behavior.drink_milk"] = {} as EntityComponents["minecraft:behavior.drink_milk"]): Component => component("minecraft:behavior.drink_milk", value);
/** `minecraft:behavior.drop_item_for` — Allows the entity to move toward a target, and drop an item near the target. This goal requires a "minecraft:navigation" to execute. */
export const behaviorDropItemFor = (value: EntityComponents["minecraft:behavior.drop_item_for"] = {} as EntityComponents["minecraft:behavior.drop_item_for"]): Component => component("minecraft:behavior.drop_item_for", value);
/** `minecraft:behavior.eat_block` — Allows the entity to consume a block, replace the eaten block with another block, and trigger an event as a result. */
export const behaviorEatBlock = (value: EntityComponents["minecraft:behavior.eat_block"] = {} as EntityComponents["minecraft:behavior.eat_block"]): Component => component("minecraft:behavior.eat_block", value);
/** `minecraft:behavior.eat_mob` — Allows the entity to eat a specified Mob. */
export const behaviorEatMob = (value: EntityComponents["minecraft:behavior.eat_mob"] = {} as EntityComponents["minecraft:behavior.eat_mob"]): Component => component("minecraft:behavior.eat_mob", value);
/** `minecraft:behavior.emerge` — Allows this entity to emerge from the ground */
export const behaviorEmerge = (value: EntityComponents["minecraft:behavior.emerge"] = {} as EntityComponents["minecraft:behavior.emerge"]): Component => component("minecraft:behavior.emerge", value);
/** `minecraft:behavior.equip_item` — The entity puts on the desired equipment. */
export const behaviorEquipItem = (value: EntityComponents["minecraft:behavior.equip_item"] = {} as EntityComponents["minecraft:behavior.equip_item"]): Component => component("minecraft:behavior.equip_item", value);
/** `minecraft:behavior.explore_outskirts` — Allows the entity to first travel to a random point on the outskirts of the village, and then explore random points within a small distance. This goal requires "minecraft:dweller" and "minecraft:navigation" to execute. */
export const behaviorExploreOutskirts = (value: EntityComponents["minecraft:behavior.explore_outskirts"] = {} as EntityComponents["minecraft:behavior.explore_outskirts"]): Component => component("minecraft:behavior.explore_outskirts", value);
/** `minecraft:behavior.fertilize_farm_block` — Allows the mob to search within an area for a growable crop block. If found, the mob will use any available fertilizer in their inventory on the crop. This goal will not execute if the mob does not have a fertilizer item in its inventory. */
export const behaviorFertilizeFarmBlock = (value: EntityComponents["minecraft:behavior.fertilize_farm_block"] = {} as EntityComponents["minecraft:behavior.fertilize_farm_block"]): Component => component("minecraft:behavior.fertilize_farm_block", value);
/** `minecraft:behavior.fire_at_target` — Allows an entity to attack by firing a shot with a delay. Anchor and offset parameters of this component overrides the anchor and offset from projectile component. */
export const behaviorFireAtTarget = (value: EntityComponents["minecraft:behavior.fire_at_target"] = {} as EntityComponents["minecraft:behavior.fire_at_target"]): Component => component("minecraft:behavior.fire_at_target", value);
/** `minecraft:behavior.follow_target_leader` — Allows mob to move towards its target leader. */
export const behaviorFollowTargetLeader = (value: EntityComponents["minecraft:behavior.follow_target_leader"] = {} as EntityComponents["minecraft:behavior.follow_target_leader"]): Component => component("minecraft:behavior.follow_target_leader", value);
/** `minecraft:behavior.go_and_give_items_to_noteblock` — The entity will attempt to toss the items from its inventory to a nearby recently played noteblock. */
export const behaviorGoAndGiveItemsToNoteblock = (value: EntityComponents["minecraft:behavior.go_and_give_items_to_noteblock"] = {} as EntityComponents["minecraft:behavior.go_and_give_items_to_noteblock"]): Component => component("minecraft:behavior.go_and_give_items_to_noteblock", value);
/** `minecraft:behavior.go_and_give_items_to_owner` — The entity will attempt to toss the items from its inventory to its owner. */
export const behaviorGoAndGiveItemsToOwner = (value: EntityComponents["minecraft:behavior.go_and_give_items_to_owner"] = {} as EntityComponents["minecraft:behavior.go_and_give_items_to_owner"]): Component => component("minecraft:behavior.go_and_give_items_to_owner", value);
/** `minecraft:behavior.go_home` — Allows the mob to move back to the position they were spawned. */
export const behaviorGoHome = (value: EntityComponents["minecraft:behavior.go_home"] = {} as EntityComponents["minecraft:behavior.go_home"]): Component => component("minecraft:behavior.go_home", value);
/** `minecraft:behavior.guardian_attack` — Allows this entity to use a laser beam attack. Can only be used by Guardians and Elder Guardians. */
export const behaviorGuardianAttack = (value: EntityComponents["minecraft:behavior.guardian_attack"] = {} as EntityComponents["minecraft:behavior.guardian_attack"]): Component => component("minecraft:behavior.guardian_attack", value);
/** `minecraft:behavior.harvest_farm_block` — Allows the entity to search within an area for farmland with air above it. If found, the entity will replace the air block by planting a seed item from its inventory on the farmland block. This goal requires "minecraft:inventory" and "minecraft:navigation" to execute. This goal will not execute if the entity does not have an item in its inventory. */
export const behaviorHarvestFarmBlock = (value: EntityComponents["minecraft:behavior.harvest_farm_block"] = {} as EntityComponents["minecraft:behavior.harvest_farm_block"]): Component => component("minecraft:behavior.harvest_farm_block", value);
/** `minecraft:behavior.investigate_suspicious_location` — Allows this entity to move towards a "suspicious" position based on data gathered in minecraft:suspect_tracking */
export const behaviorInvestigateSuspiciousLocation = (value: EntityComponents["minecraft:behavior.investigate_suspicious_location"] = {} as EntityComponents["minecraft:behavior.investigate_suspicious_location"]): Component => component("minecraft:behavior.investigate_suspicious_location", value);
/** `minecraft:behavior.jump_around_target` — Allows an entity to jump around a target. */
export const behaviorJumpAroundTarget = (value: EntityComponents["minecraft:behavior.jump_around_target"] = {} as EntityComponents["minecraft:behavior.jump_around_target"]): Component => component("minecraft:behavior.jump_around_target", value);
/** `minecraft:behavior.jump_to_block` — Allows an entity to jump to another random block. */
export const behaviorJumpToBlock = (value: EntityComponents["minecraft:behavior.jump_to_block"] = {} as EntityComponents["minecraft:behavior.jump_to_block"]): Component => component("minecraft:behavior.jump_to_block", value);
/** `minecraft:behavior.knockback_roar` — Allows the mob to perform a damaging knockback that affects all nearby entities. */
export const behaviorKnockbackRoar = (value: EntityComponents["minecraft:behavior.knockback_roar"] = {} as EntityComponents["minecraft:behavior.knockback_roar"]): Component => component("minecraft:behavior.knockback_roar", value);
/** `minecraft:behavior.melee_attack` — Allows an entity to deal damage through a melee attack. */
export const behaviorMeleeAttack = (value: EntityComponents["minecraft:behavior.melee_attack"] = {} as EntityComponents["minecraft:behavior.melee_attack"]): Component => component("minecraft:behavior.melee_attack", value);
/** `minecraft:behavior.melee_box_attack` — Allows an entity to deal damage through a melee attack with reach calculations based on bounding boxes. */
export const behaviorMeleeBoxAttack = (value: EntityComponents["minecraft:behavior.melee_box_attack"] = {} as EntityComponents["minecraft:behavior.melee_box_attack"]): Component => component("minecraft:behavior.melee_box_attack", value);
/** `minecraft:behavior.move_around_target` — Allows an entity to move around a target.If the entity is too close(i.e.closer than destination range min and height difference limit) it will try to move away from its target.If the entity is too far away from its target it will try to move closer to a random position within the destination range.A randomized amount of those positions will be behind the target, and the spread can be tweaked with 'destination_pos_spread_degrees'. */
export const behaviorMoveAroundTarget = (value: EntityComponents["minecraft:behavior.move_around_target"] = {} as EntityComponents["minecraft:behavior.move_around_target"]): Component => component("minecraft:behavior.move_around_target", value);
/** `minecraft:behavior.move_indoors` — Allows this entity to move indoors. */
export const behaviorMoveIndoors = (value: EntityComponents["minecraft:behavior.move_indoors"] = {} as EntityComponents["minecraft:behavior.move_indoors"]): Component => component("minecraft:behavior.move_indoors", value);
/** `minecraft:behavior.move_outdoors` — Allows this entity to move outdoors. */
export const behaviorMoveOutdoors = (value: EntityComponents["minecraft:behavior.move_outdoors"] = {} as EntityComponents["minecraft:behavior.move_outdoors"]): Component => component("minecraft:behavior.move_outdoors", value);
/** `minecraft:behavior.move_towards_dwelling_restriction` — Allows entities with the "minecraft:dweller" component to move toward their village area that the entity should be restricted to. */
export const behaviorMoveTowardsDwellingRestriction = (value: EntityComponents["minecraft:behavior.move_towards_dwelling_restriction"] = {} as EntityComponents["minecraft:behavior.move_towards_dwelling_restriction"]): Component => component("minecraft:behavior.move_towards_dwelling_restriction", value);
/** `minecraft:behavior.move_towards_home_restriction` — Allows entities with a "minecraft:home" component to move towards their home position. If "restriction_radius" is set, entities will be able to run this behavior only if outside of it. */
export const behaviorMoveTowardsHomeRestriction = (value: EntityComponents["minecraft:behavior.move_towards_home_restriction"] = {} as EntityComponents["minecraft:behavior.move_towards_home_restriction"]): Component => component("minecraft:behavior.move_towards_home_restriction", value);
/** `minecraft:behavior.ocelotattack` — Controls specific attack behavior for Ocelots. */
export const behaviorOcelotattack = (value: EntityComponents["minecraft:behavior.ocelotattack"] = {} as EntityComponents["minecraft:behavior.ocelotattack"]): Component => component("minecraft:behavior.ocelotattack", value);
/** `minecraft:behavior.offer_flower` — Allows the mob to offer a flower to another mob with the minecraft:take_flower behavior. */
export const behaviorOfferFlower = (value: EntityComponents["minecraft:behavior.offer_flower"] = {} as EntityComponents["minecraft:behavior.offer_flower"]): Component => component("minecraft:behavior.offer_flower", value);
/** `minecraft:behavior.place_block` — Allows the entity to place a block. */
export const behaviorPlaceBlock = (value: EntityComponents["minecraft:behavior.place_block"] = {} as EntityComponents["minecraft:behavior.place_block"]): Component => component("minecraft:behavior.place_block", value);
/** `minecraft:behavior.play` — Allows the mob to offer a flower to another mob with the minecraft:take_flower behavior. */
export const behaviorPlay = (value: EntityComponents["minecraft:behavior.play"] = {} as EntityComponents["minecraft:behavior.play"]): Component => component("minecraft:behavior.play", value);
/** `minecraft:behavior.play_dead` — Allows this entity to pretend to be dead to avoid being targeted by attackers. */
export const behaviorPlayDead = (value: EntityComponents["minecraft:behavior.play_dead"] = {} as EntityComponents["minecraft:behavior.play_dead"]): Component => component("minecraft:behavior.play_dead", value);
/** `minecraft:behavior.ram_attack` — Allows this entity to damage a target by using a running attack. */
export const behaviorRamAttack = (value: EntityComponents["minecraft:behavior.ram_attack"] = {} as EntityComponents["minecraft:behavior.ram_attack"]): Component => component("minecraft:behavior.ram_attack", value);
/** `minecraft:behavior.random_search_and_dig` — Allows this entity to locate a random target block that it can path find to. Once found, the entity will move towards it and dig up an item. [Default target block types: Dirt, Grass, Podzol, DirtWithRoots, MossBlock, Mud, MuddyMangroveRoots]. */
export const behaviorRandomSearchAndDig = (value: EntityComponents["minecraft:behavior.random_search_and_dig"] = {} as EntityComponents["minecraft:behavior.random_search_and_dig"]): Component => component("minecraft:behavior.random_search_and_dig", value);
/** `minecraft:behavior.ranged_attack` — Allows an entity to attack by using ranged shots. "charge_shoot_trigger" must be greater than 0 to enable charged up burst-shot attacks. Requires minecraft:shooter to define projectile behaviour. */
export const behaviorRangedAttack = (value: EntityComponents["minecraft:behavior.ranged_attack"] = {} as EntityComponents["minecraft:behavior.ranged_attack"]): Component => component("minecraft:behavior.ranged_attack", value);
/** `minecraft:behavior.roar` — Allows this entity to roar at another entity based on data in minecraft:anger_level. Once the anger threshold specified in minecraft:anger_level has been reached, this entity will roar for the specified amount of time, look at the other entity, apply anger boost towards it, and finally target it. */
export const behaviorRoar = (value: EntityComponents["minecraft:behavior.roar"] = {} as EntityComponents["minecraft:behavior.roar"]): Component => component("minecraft:behavior.roar", value);
/** `minecraft:behavior.slime_attack` — Causes the entity to grow tired every once in a while, while attacking. */
export const behaviorSlimeAttack = (value: EntityComponents["minecraft:behavior.slime_attack"] = {} as EntityComponents["minecraft:behavior.slime_attack"]): Component => component("minecraft:behavior.slime_attack", value);
/** `minecraft:behavior.slime_float` — Allow slimes to float in water / lava. Can only be used by Slime and Magma Cubes. */
export const behaviorSlimeFloat = (value: EntityComponents["minecraft:behavior.slime_float"] = {} as EntityComponents["minecraft:behavior.slime_float"]): Component => component("minecraft:behavior.slime_float", value);
/** `minecraft:behavior.slime_keep_on_jumping` — Allows the entity to continuously jump around like a slime. */
export const behaviorSlimeKeepOnJumping = (value: EntityComponents["minecraft:behavior.slime_keep_on_jumping"] = {} as EntityComponents["minecraft:behavior.slime_keep_on_jumping"]): Component => component("minecraft:behavior.slime_keep_on_jumping", value);
/** `minecraft:behavior.slime_random_direction` — Allows the entity to move in random directions like a slime. */
export const behaviorSlimeRandomDirection = (value: EntityComponents["minecraft:behavior.slime_random_direction"] = {} as EntityComponents["minecraft:behavior.slime_random_direction"]): Component => component("minecraft:behavior.slime_random_direction", value);
/** `minecraft:behavior.sniff` — Allows this entity to detect the nearest player within "sniffing_radius" and update its "minecraft:suspect_tracking" component state */
export const behaviorSniff = (value: EntityComponents["minecraft:behavior.sniff"] = {} as EntityComponents["minecraft:behavior.sniff"]): Component => component("minecraft:behavior.sniff", value);
/** `minecraft:behavior.sonic_boom` — Allows this entity to perform a 'sonic boom' ranged attack */
export const behaviorSonicBoom = (value: EntityComponents["minecraft:behavior.sonic_boom"] = {} as EntityComponents["minecraft:behavior.sonic_boom"]): Component => component("minecraft:behavior.sonic_boom", value);
/** `minecraft:behavior.stay_near_noteblock` — The entity will attempt to toss the items from its inventory to a nearby recently played noteblock. */
export const behaviorStayNearNoteblock = (value: EntityComponents["minecraft:behavior.stay_near_noteblock"] = {} as EntityComponents["minecraft:behavior.stay_near_noteblock"]): Component => component("minecraft:behavior.stay_near_noteblock", value);
/** `minecraft:behavior.stomp_attack` — Allows an entity to attack using stomp AoE damage behavior. */
export const behaviorStompAttack = (value: EntityComponents["minecraft:behavior.stomp_attack"] = {} as EntityComponents["minecraft:behavior.stomp_attack"]): Component => component("minecraft:behavior.stomp_attack", value);
/** `minecraft:behavior.swim_idle` — Allows the entity go idle, if swimming. Entity must be in water. */
export const behaviorSwimIdle = (value: EntityComponents["minecraft:behavior.swim_idle"] = {} as EntityComponents["minecraft:behavior.swim_idle"]): Component => component("minecraft:behavior.swim_idle", value);
/** `minecraft:behavior.swim_up_for_breath` — Allows the mob to try to move to air once it is close to running out of its total breathable supply. Requires "minecraft:breathable". */
export const behaviorSwimUpForBreath = (value: EntityComponents["minecraft:behavior.swim_up_for_breath"] = {} as EntityComponents["minecraft:behavior.swim_up_for_breath"]): Component => component("minecraft:behavior.swim_up_for_breath", value);
/** `minecraft:behavior.swim_wander` — Allows the entity to wander around while swimming, when not path-finding. */
export const behaviorSwimWander = (value: EntityComponents["minecraft:behavior.swim_wander"] = {} as EntityComponents["minecraft:behavior.swim_wander"]): Component => component("minecraft:behavior.swim_wander", value);
/** `minecraft:behavior.swim_with_entity` — Allows this entity to locate a random target block that it can path find to. Once found, the entity will move towards it and dig up an item. [Default target block types: Dirt, Grass, Podzol, DirtWithRoots, MossBlock, Mud, MuddyMangroveRoots]. */
export const behaviorSwimWithEntity = (value: EntityComponents["minecraft:behavior.swim_with_entity"] = {} as EntityComponents["minecraft:behavior.swim_with_entity"]): Component => component("minecraft:behavior.swim_with_entity", value);
/** `minecraft:behavior.swoop_attack` — Allows an entity to attack using swoop attack behavior; Ideal for use with flying mobs. The behavior ends if the entity has a horizontal collision or gets hit. */
export const behaviorSwoopAttack = (value: EntityComponents["minecraft:behavior.swoop_attack"] = {} as EntityComponents["minecraft:behavior.swoop_attack"]): Component => component("minecraft:behavior.swoop_attack", value);
/** `minecraft:behavior.take_block` — Allows the entity to take a block from the world and carry it around. */
export const behaviorTakeBlock = (value: EntityComponents["minecraft:behavior.take_block"] = {} as EntityComponents["minecraft:behavior.take_block"]): Component => component("minecraft:behavior.take_block", value);
/** `minecraft:behavior.take_flower` — Allows the mob to accept flowers from another mob with the minecraft:offer_flower behavior. */
export const behaviorTakeFlower = (value: EntityComponents["minecraft:behavior.take_flower"] = {} as EntityComponents["minecraft:behavior.take_flower"]): Component => component("minecraft:behavior.take_flower", value);
/** `minecraft:behavior.teleport_to_owner` — Allows an entity to teleport to its owner. */
export const behaviorTeleportToOwner = (value: EntityComponents["minecraft:behavior.teleport_to_owner"] = {} as EntityComponents["minecraft:behavior.teleport_to_owner"]): Component => component("minecraft:behavior.teleport_to_owner", value);
/** `minecraft:behavior.timer_flag_1` — Fires an event when this behavior starts, then waits for a duration before stopping. When stopping due to that timeout or due to being interrupted by another behavior, fires another event. query.timer_flag_1 will return 1.0 on both the client and server when this behavior is running, and 0.0 otherwise. */
export const behaviorTimerFlag1 = (value: EntityComponents["minecraft:behavior.timer_flag_1"] = {} as EntityComponents["minecraft:behavior.timer_flag_1"]): Component => component("minecraft:behavior.timer_flag_1", value);
/** `minecraft:behavior.timer_flag_2` — Fires an event when this behavior starts, then waits for a duration before stopping. When stopping due to that timeout or due to being interrupted by another behavior, fires another event. query.timer_flag_2 will return 1.0 on both the client and server when this behavior is running, and 0.0 otherwise. */
export const behaviorTimerFlag2 = (value: EntityComponents["minecraft:behavior.timer_flag_2"] = {} as EntityComponents["minecraft:behavior.timer_flag_2"]): Component => component("minecraft:behavior.timer_flag_2", value);
/** `minecraft:behavior.timer_flag_3` — Fires an event when this behavior starts, then waits for a duration before stopping. When stopping due to that timeout or due to being interrupted by another behavior, fires another event. query.timer_flag_3 will return 1.0 on both the client and server when this behavior is running, and 0.0 otherwise. */
export const behaviorTimerFlag3 = (value: EntityComponents["minecraft:behavior.timer_flag_3"] = {} as EntityComponents["minecraft:behavior.timer_flag_3"]): Component => component("minecraft:behavior.timer_flag_3", value);
/** `minecraft:behavior.trade_with_player` — Allows the player to trade with this mob. When the goal starts, it will stop the mob's navigation. */
export const behaviorTradeWithPlayer = (value: EntityComponents["minecraft:behavior.trade_with_player"] = {} as EntityComponents["minecraft:behavior.trade_with_player"]): Component => component("minecraft:behavior.trade_with_player", value);
/** `minecraft:behavior.transport_items` — A behavior that enables a mob to transport items from and to containers. */
export const behaviorTransportItems = (value: EntityComponents["minecraft:behavior.transport_items"] = {} as EntityComponents["minecraft:behavior.transport_items"]): Component => component("minecraft:behavior.transport_items", value);
/** `minecraft:behavior.use_kinetic_weapon` — Enables a mob to use kinetic weaponry by intermittently charging at its target and repositioning afterward. */
export const behaviorUseKineticWeapon = (value: EntityComponents["minecraft:behavior.use_kinetic_weapon"] = {} as EntityComponents["minecraft:behavior.use_kinetic_weapon"]): Component => component("minecraft:behavior.use_kinetic_weapon", value);
/** `minecraft:behavior.work` — Allows the NPC to use the POI */
export const behaviorWork = (value: EntityComponents["minecraft:behavior.work"] = {} as EntityComponents["minecraft:behavior.work"]): Component => component("minecraft:behavior.work", value);
/** `minecraft:behavior.work_composter` — Allows the NPC to use the composter POI to convert excess seeds into bone meal. */
export const behaviorWorkComposter = (value: EntityComponents["minecraft:behavior.work_composter"] = {} as EntityComponents["minecraft:behavior.work_composter"]): Component => component("minecraft:behavior.work_composter", value);
/** `minecraft:block_movement_slowdown_immunity` — Prevents specified blocks from contributing to this entity's block movement slowdown. It does not cause other blocks to apply slowdown. */
export const blockMovementSlowdownImmunity = (value: EntityComponents["minecraft:block_movement_slowdown_immunity"] = {} as EntityComponents["minecraft:block_movement_slowdown_immunity"]): Component => component("minecraft:block_movement_slowdown_immunity", value);
/** `minecraft:bounciness` — Minecraft Bounciness */
export const bounciness = (value: EntityComponents["minecraft:bounciness"] = {} as EntityComponents["minecraft:bounciness"]): Component => component("minecraft:bounciness", value);
/** `minecraft:can_stand_on_powder_snow` — Defines whether an entity can stand on powder snow without sinking. */
export const canStandOnPowderSnow = (value: EntityComponents["minecraft:can_stand_on_powder_snow"] = {} as EntityComponents["minecraft:can_stand_on_powder_snow"]): Component => component("minecraft:can_stand_on_powder_snow", value);
/** `minecraft:dash_action` — Minecraft Dash Action */
export const dashAction = (value: EntityComponents["minecraft:dash_action"] = {} as EntityComponents["minecraft:dash_action"]): Component => component("minecraft:dash_action", value);
/** `minecraft:free_camera_controlled` — Minecraft Free Camera Controlled */
export const freeCameraControlled = (value: EntityComponents["minecraft:free_camera_controlled"] = {} as EntityComponents["minecraft:free_camera_controlled"]): Component => component("minecraft:free_camera_controlled", value);
/** `minecraft:freezing_immune` — Defines whether an entity should be affected by freezing. */
export const freezingImmune = (value: EntityComponents["minecraft:freezing_immune"] = {} as EntityComponents["minecraft:freezing_immune"]): Component => component("minecraft:freezing_immune", value);
/** `minecraft:freezing_vulnerable` — Defines whether an entity should take increased damage from freezing. */
export const freezingVulnerable = (value: EntityComponents["minecraft:freezing_vulnerable"] = {} as EntityComponents["minecraft:freezing_vulnerable"]): Component => component("minecraft:freezing_vulnerable", value);
/** `minecraft:memory_behavior.flee_threat` — Flee Threat Minecraft Memory Behavior */
export const memoryBehaviorFleeThreat = (value: EntityComponents["minecraft:memory_behavior.flee_threat"] = {} as EntityComponents["minecraft:memory_behavior.flee_threat"]): Component => component("minecraft:memory_behavior.flee_threat", value);
/** `minecraft:memory_behavior.follow_target` — Follow Target Minecraft Memory Behavior */
export const memoryBehaviorFollowTarget = (value: EntityComponents["minecraft:memory_behavior.follow_target"] = {} as EntityComponents["minecraft:memory_behavior.follow_target"]): Component => component("minecraft:memory_behavior.follow_target", value);
/** `minecraft:memory_sensor.game_event` — Game Event Minecraft Memory Sensor */
export const memorySensorGameEvent = (value: EntityComponents["minecraft:memory_sensor.game_event"] = {} as EntityComponents["minecraft:memory_sensor.game_event"]): Component => component("minecraft:memory_sensor.game_event", value);
/** `minecraft:memory_sensor.in_range_of_entity` — In Range Of Entity Minecraft Memory Sensor */
export const memorySensorInRangeOfEntity = (value: EntityComponents["minecraft:memory_sensor.in_range_of_entity"] = {} as EntityComponents["minecraft:memory_sensor.in_range_of_entity"]): Component => component("minecraft:memory_sensor.in_range_of_entity", value);
/** `minecraft:not_pickable_from_inside` — Minecraft Not Pickable From Inside */
export const notPickableFromInside = (value: EntityComponents["minecraft:not_pickable_from_inside"] = {} as EntityComponents["minecraft:not_pickable_from_inside"]): Component => component("minecraft:not_pickable_from_inside", value);
/** `minecraft:offspring` — Minecraft Offspring */
export const offspring = (value: EntityComponents["minecraft:offspring"] = {} as EntityComponents["minecraft:offspring"]): Component => component("minecraft:offspring", value);
/** `minecraft:on_equipment_changed` — Allows to specify events to execute when equipment is set in the entity's default equipment slots. Doesn't apply to "minecraft:inventory", use "minecraft:equippable" instead. */
export const onEquipmentChanged = (value: EntityComponents["minecraft:on_equipment_changed"] = {} as EntityComponents["minecraft:on_equipment_changed"]): Component => component("minecraft:on_equipment_changed", value);
/** `minecraft:pushable_by_block` — Minecraft Pushable By Block */
export const pushableByBlock = (value: EntityComponents["minecraft:pushable_by_block"] = {} as EntityComponents["minecraft:pushable_by_block"]): Component => component("minecraft:pushable_by_block", value);
/** `minecraft:pushable_by_entity` — Allows an entity to be pushed by other entities. */
export const pushableByEntity = (value: EntityComponents["minecraft:pushable_by_entity"] = {} as EntityComponents["minecraft:pushable_by_entity"]): Component => component("minecraft:pushable_by_entity", value);
/** `minecraft:rotation_locked_to_vehicle` — Minecraft Rotation Locked To Vehicle */
export const rotationLockedToVehicle = (value: EntityComponents["minecraft:rotation_locked_to_vehicle"] = {} as EntityComponents["minecraft:rotation_locked_to_vehicle"]): Component => component("minecraft:rotation_locked_to_vehicle", value);
/** `minecraft:spawn_egg_interaction` — Minecraft Spawn Egg Interaction */
export const spawnEggInteraction = (value: EntityComponents["minecraft:spawn_egg_interaction"] = {} as EntityComponents["minecraft:spawn_egg_interaction"]): Component => component("minecraft:spawn_egg_interaction", value);
/** `minecraft:spawn_on_death` — Component for spawning entities when an entity perishes. */
export const spawnOnDeath = (value: EntityComponents["minecraft:spawn_on_death"] = {} as EntityComponents["minecraft:spawn_on_death"]): Component => component("minecraft:spawn_on_death", value);
/** `minecraft:underwater_mount_breathing` — Minecraft Underwater Mount Breathing */
export const underwaterMountBreathing = (value: EntityComponents["minecraft:underwater_mount_breathing"] = {} as EntityComponents["minecraft:underwater_mount_breathing"]): Component => component("minecraft:underwater_mount_breathing", value);
/** `minecraft:uses_legacy_ambient_sounds` — [DEPRECATED] Allows the entity to automatically determine which ambient sound to play:
		\n - `ambient.in.air` when not on the ground
		\n - `ambient.in.water` when its head is in water
		\n - `ambient.baby` if it is a baby
		\n - `ambient` otherwise

*⚠️ Deprecated*
 * @deprecated */
export const usesLegacyAmbientSounds = (value: EntityComponents["minecraft:uses_legacy_ambient_sounds"] = {} as EntityComponents["minecraft:uses_legacy_ambient_sounds"]): Component => component("minecraft:uses_legacy_ambient_sounds", value);
/** `minecraft:uses_legacy_friction` — Minecraft Uses Legacy Friction */
export const usesLegacyFriction = (value: EntityComponents["minecraft:uses_legacy_friction"] = {} as EntityComponents["minecraft:uses_legacy_friction"]): Component => component("minecraft:uses_legacy_friction", value);
/** `minecraft:uses_uniform_air_drag` — Minecraft Uses Uniform Air Drag */
export const usesUniformAirDrag = (value: EntityComponents["minecraft:uses_uniform_air_drag"] = {} as EntityComponents["minecraft:uses_uniform_air_drag"]): Component => component("minecraft:uses_uniform_air_drag", value);
/** `minecraft:vertical_movement_action` — Minecraft Vertical Movement Action */
export const verticalMovementAction = (value: EntityComponents["minecraft:vertical_movement_action"] = {} as EntityComponents["minecraft:vertical_movement_action"]): Component => component("minecraft:vertical_movement_action", value);
