/**
 *
 * @name Utils
 *  _   _ _   _ _
 * | | | | |_(_) |___
 * | | | | __| | / __|
 * | |_| | |_| | \__ \
 *  \___/ \__|_|_|___/
 *
 */

type TagNameMap = HTMLElementTagNameMap &
  SVGElementTagNameMap &
  MathMLElementTagNameMap

/**
 *
 * @name Handlers
 *
 *  _   _                 _ _
 * | | | | __ _ _ __   __| | | ___ _ __ ___
 * | |_| |/ _` | '_ \ / _` | |/ _ \ '__/ __|
 * |  _  | (_| | | | | (_| | |  __/ |  \__ \
 * |_| |_|\__,_|_| |_|\__,_|_|\___|_|  |___/
 *
 */

type EventAttrName =
  | 'onAbort'
  | 'onAnimationCancel'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStart'
  | 'onAuxClick'
  | 'onBeforeInput'
  | 'onBeforeToggle'
  | 'onBlur'
  | 'onCancel'
  | 'onCanPlay'
  | 'onCanPlayThrough'
  | 'onChange'
  | 'onClick'
  | 'onClose'
  | 'onContextMenu'
  | 'onCopy'
  | 'onCueChange'
  | 'onCut'
  | 'onDblClick'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDragStart'
  | 'onDrop'
  | 'onDurationChange'
  | 'onEmptied'
  | 'onEnded'
  | 'onError'
  | 'onFocus'
  | 'onFormData'
  | 'onGotPointerCapture'
  | 'onInput'
  | 'onInvalid'
  | 'onKeyDown'
  | 'onKeyPress'
  | 'onKeyUp'
  | 'onLoad'
  | 'onLoadedData'
  | 'onLoadedMetadata'
  | 'onLoadStart'
  | 'onLostPointerCapture'
  | 'onMouseDown'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseMove'
  | 'onMouseOut'
  | 'onMouseOver'
  | 'onMouseUp'
  | 'onPaste'
  | 'onPause'
  | 'onPlay'
  | 'onPlaying'
  | 'onPointerCancel'
  | 'onPointerDown'
  | 'onPointerEnter'
  | 'onPointerLeave'
  | 'onPointerMove'
  | 'onPointerOut'
  | 'onPointerOver'
  | 'onPointerUp'
  | 'onProgress'
  | 'onRateChange'
  | 'onReset'
  | 'onResize'
  | 'onScroll'
  | 'onScrollEnd'
  | 'onSecurityPolicyViolation'
  | 'onSeeked'
  | 'onSeeking'
  | 'onSelect'
  | 'onSelectionChange'
  | 'onSelectStart'
  | 'onSlotChange'
  | 'onStalled'
  | 'onSubmit'
  | 'onSuspend'
  | 'onTimeUpdate'
  | 'onToggle'
  | 'onTouchCancel'
  | 'onTouchEnd'
  | 'onTouchMove'
  | 'onTouchStart'
  | 'onTransitionCancel'
  | 'onTransitionEnd'
  | 'onTransitionRun'
  | 'onTransitionStart'
  | 'onVolumeChange'
  | 'onWaiting'
  | 'onWheel'
// | 'onTextUpdate'
// | 'onTextFormatUpdate'
// | 'onCharacterBoundsUpdate'
// | 'onCompositionStart'
// | 'onCompositionEnd'

/**
 *
 * @name Custom
 *
 *   ____          _
 *  / ___|   _ ___| |_ ___  _ __ ___
 * | |  | | | / __| __/ _ \| '_ ` _ \
 * | |__| |_| \__ \ || (_) | | | | | |
 *  \____\__,_|___/\__\___/|_| |_| |_|
 *
 */

interface CustomElement<T extends Element> {
  prototype: T
  new (...params: any[]): T
  connectedCallback?(): void
  attributeChangedCallback?(): void
  disconnectedCallback?(): void
}

interface HTMLElement {
  style: Partial<CSSStyleDeclaration>
}

/**
 *
 * @name SVG
 *
 *  ______     ______
 * / ___\ \   / / ___|
 * \___ \\ \ / / |  _
 *  ___) |\ V /| |_| |
 * |____/  \_/  \____|
 *
 */

interface SVGSymbolElement {
  width: `${number}px`
  height: `${number}px`
}

interface SVGLineElement {
  strokeDasharray: string
  strokeWidth: number
}

interface SVGPathElement {
  strokeDasharray: string
  strokeWidth: number
}

interface SVGEllipseElement {
  strokeDasharray: string
  strokeWidth: number
}

interface SVGStopElement {
  stopColor: string
}

interface SVGElement {
  viewBox: `${number} ${number} ${number} ${number}`
  xmlns: 'http://www.w3.org/2000/svg'
  style: Partial<CSSStyleDeclaration>
  stroke: string
  fill: string
  d: string
  mask: string
}

/**
 *
 * @name Derived
 *
 *  ____            _               _
 * |  _ \  ___ _ __(_)_   _____  __| |
 * | | | |/ _ \ '__| \ \ / / _ \/ _` |
 * | |_| |  __/ |  | |\ V /  __/ (_| |
 * |____/ \___|_|  |_| \_/ \___|\__,_|
 *
 */

interface DerivedTarget<T> {
  target: T
}

type DerivedEventTarget<E extends Event, T> = Omit<E, 'target'> &
  DerivedTarget<T>

type DerivedEventHandler<E extends Event, T> =
  | ((this: T, ev: DerivedEventTarget<E, T>) => unknown)
  | null

type OnlyEvent<T extends string> = T extends `on${infer K}`
  ? Lowercase<K>
  : never

type ReverseEventKey<K extends EventAttrName> = OnlyEvent<K>

type AttrNameEvent<K extends EventAttrName> =
  GlobalEventHandlersEventMap[ReverseEventKey<K>]

type DerivedEventHandlers<T> = {
  [K in EventAttrName]: DerivedEventHandler<AttrNameEvent<K>, T>
}

type DerivedAnimatedLength<S> = {
  [A in keyof S]: S[A] extends SVGAnimatedLength ? number | string : S[A]
}

type DerivedAnimatedString<S> = {
  [A in keyof S]: S[A] extends SVGAnimatedString ? string : S[A]
}

type DerivedAnimatedNumber<S> = {
  [A in keyof S]: S[A] extends SVGAnimatedNumber ? string : S[A]
}

type DerivedAnimated<S> = DerivedAnimatedString<S>

type ElementRef<T> = {
  current(): T
}

/**
 *
 * @name JSX
 *
 *      _ ______  __
 *     | / ___\ \/ /
 *  _  | \___ \\  /
 * | |_| |___) /  \
 *  \___/|____/_/\_\
 *
 */

declare namespace JSX {
  type Factory<T> = (...params: any[]) => Element<T>

  type DerivedRef<T> = {
    ref: ElementRef<T>
  }

  type Element<T> = T & Node & CustomElement<T> & DerivedEventHandlers<T>

  type IntrinsicElements = {
    [K in keyof TagNameMap]: Partial<
      Element<
        DerivedAnimatedNumber<
          DerivedAnimatedString<
            DerivedAnimatedLength<TagNameMap[K] & DerivedRef<TagNameMap[K]>>
          >
        >
      >
    >
  }
}
