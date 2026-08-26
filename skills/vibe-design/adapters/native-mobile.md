# Native-mobile Adapter

Load this only when native mobile or Expo, Reanimated, Gesture Handler, or haptics is supplied or detected. Apply platform conventions without treating one toolkit or platform aesthetic as universal.

## 1. Recon

Inspect target platforms, navigation, native/component packages, Expo/React Native versions, Reanimated/Gesture Handler setup, architecture/runtime constraints, safe-area/keyboard handling, haptic capability, accessibility APIs, performance budgets, and real-device test path. Verify time-sensitive APIs and package compatibility from the project or primary sources.

**Gate:** Platform, input, runtime/thread, library version, and device verification boundaries are explicit.

## 2. Map the portable contract

- Express anatomy as a platform role/accessibility tree and use native controls/behaviors when they satisfy the contract.
- Map tokens to the existing theme/resource layer; preserve dynamic type, locale/direction, safe areas, keyboard, orientation, and contrast preferences.
- Keep state, focus, announcement, and task completion independent of animation lifecycle.
- Adapt interaction density and gesture behavior to touch while preserving alternatives for switch, keyboard, voice, and assistive input where applicable.

## 3. Apply detected motion tools

- Keep continuous gesture/animation work on the appropriate UI/native execution path; avoid round-tripping per-frame values through the JavaScript/application thread.
- Use shared values/worklets and Gesture Handler only when present and version-compatible.
- Direct manipulation tracks one-to-one, respects grab offset, uses capture/gesture ownership, and settles from live position/velocity.
- Springs, momentum, rubber-banding, and haptics require a named purpose. Haptics align with the causal event and remain sparse.
- Reduced motion removes large translation, overshoot, parallax, or loops while preserving state feedback. No hover assumptions apply.

## 4. Verify

Test release builds on representative real devices when possible, including slowest supported hardware, high-refresh behavior where relevant, dynamic type, orientation, safe areas, keyboard, RTL/localization, screen-reader/voice access, reduced motion, gesture interruption/reversal, haptic timing, dropped frames, and navigation transitions.

If physical devices are unavailable, use simulator/emulator evidence and name real-device feel/performance as unverified.

**Completion:** The native mapping follows platform and project conventions, detected APIs are version-verified, gestures/motion stay on the correct runtime path, accessibility/state survive without motion, and real-device or explicit fallback evidence is recorded. Generic Swift language advice and library-specific API manuals remain outside this adapter.
