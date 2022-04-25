export enum EObserverEvent {
    /** action 行为触发前 */
    ON_ACTION_BEFORE = 'onActionBefore',
    /** action 行为触发后 */
    ON_ACTION_AFTER = 'onActionAfter',
    /** $commit 触发前过滤 */
    ON_COMMIT_FILTER = 'onCommitFilter',
    /** $patch 触发前过滤 */
    ON_PATCH_FILTER = 'onPatchFilter'
}

/** store 观察者 参数 */
export interface IStoreObserverOptions {
    /** action 行为调用前触发
     *
     * @param {boolean | undefined} next 是否允许触发下一过程(更改), 仅当值为 `false` 时, 才会中断值提交操作.
     */
    [EObserverEvent.ON_ACTION_BEFORE]?: (event: IActionBeforeEvent, next: () => void) => void | Promise<void>

    /** action 行为调用后触发 */
    [EObserverEvent.ON_ACTION_AFTER]?: (event: IActionAfaterEvent, next: () => void) => void | Promise<void>

    /** $commit 更新值过滤事件
     *
     * @param {boolean | ICommitFilterEvent | undefined} next 是否允许触发下一过程(更改), 仅当值为 `false` 时, 才会中断值提交操作.
     *     - 当 next 参数为 ICommitFilterEvent 时, 将使用 `event` 中参数及值替代原始的commit.
     */
    [EObserverEvent.ON_COMMIT_FILTER]?: (
        event: ICommitFilterEvent,
        next: (allowChange: boolean | ICommitFilterEvent | undefined) => void
    ) => void | Promise<void>

    /** $patch 更新值过滤事件
     *
     * @description 由于 $patch 本身是原子性操作. 所以, 针对 $patch 更新的属性, 要不都成功, 要不都失败.
     *
     * @param {boolean | IPatchFilterEvent | undefined} next 是否允许触发下一过程(更改), 仅当值为 `false` 时, 才会中断值提交操作.
     *     - 当 next 参数为 IPatchFilterEvent 时, 将使用 `event` 中参数及值替代原始的commit.
     */
    [EObserverEvent.ON_PATCH_FILTER]?: (
        event: IPatchFilterEvent,
        next: (allowChange: boolean | IPatchFilterEvent | undefined) => void
    ) => void | Promise<void>
}

/** action 行为调用前触发事件 */
export interface IActionBeforeEvent {
    /** 触发事件的 Module Name */
    readonly module: string
    /** 事件/行为 */
    readonly action: string
    /** 调用参数 */
    params?: IArguments
}

/** action 行为调用后触发事件 */
export interface IActionAfaterEvent {
    /** 触发的 Module Name */
    readonly module: string
    /** 触发的 action */
    readonly action: string
    /** 调用参数 */
    params?: IArguments
    /** 执行结果 */
    res?: any
}

/** $commit 过滤事件
 *
 * @description 本质上来说, 是在模拟装饰器的功能.
 */
export interface ICommitFilterEvent {
    /** 触发的 Module Name */
    readonly module: string
    /** 变更项: key */
    key: string | Array<string>
    /** 变更项: value */
    value: any
}

/** StoreModule state 变更事件 */
export interface IPatchFilterEvent {
    /** 触发的 Module Name */
    readonly module: string
    /** 原始提交项, 未解构 */
    patch: { [key: string]: any }
}

/** 注册 action before 事件参数 */
export interface IRegisterActionBeforeOptions {
    /** 限制 module
     *
     * @description 仅涉及到的module会被捕获
     */
    modules?: string | Array<string>

    /** 限制行为
     *
     * @description 仅涉及到的actions会被捕获, 注意: 与 modules 条件不存在因果关系
     */
    actions?: string | Array<string>

    /** 处理方法 */
    handler: (event: IActionBeforeEvent, next: () => void) => void | Promise<void>
}

/** 注册 action after 事件参数 */
export interface IRegisterActionAfterOptions {
    /** 限制 module
     *
     * @description 仅涉及到的module会被捕获
     */
    modules?: string | Array<string>

    /** 限制行为
     *
     * @description 仅涉及到的actions会被捕获, 注意: 与 modules 条件不存在因果关系
     */
    actions?: string | Array<string>

    /** 处理方法 */
    handler: (event: IActionBeforeEvent, next: () => void) => void | Promise<void>
}

/** 注册 $commit filter 事件参数 */
export interface IRegisterCommitFilterOptions {
    /** 限制 module
     *
     * @description 仅涉及到的module会被捕获
     */
    modules?: string | Array<string>

    /** 处理方法
     *
     * @param {boolean | IPatchFilterEvent | undefined} next 是否允许触发下一过程(更改), 仅当值为 `false` 时, 才会中断值提交操作.
     *     - 当 next 参数为 IPatchFilterEvent 时, 将使用 `event` 中参数及值替代原始的commit.
     */
    handler: (
        event: ICommitFilterEvent,
        next: (allowChange: boolean | ICommitFilterEvent | undefined) => void
    ) => void | Promise<void>
}

/** 注册 $patch filter 事件参数 */
export interface IRegisterPatchFilterOptions {
    /** 限制 module
     *
     * @description 仅涉及到的module会被捕获
     */
    modules?: string | Array<string>

    /** 处理方法
     *
     * @param {boolean | IPatchFilterEvent | undefined} next 是否允许触发下一过程(更改), 仅当值为 `false` 时, 才会中断值提交操作.
     *     - 当 next 参数为 IPatchFilterEvent 时, 将使用 `event` 中参数及值替代原始的commit.
     */
    handler: (
        event: IPatchFilterEvent,
        next: (allowChange: boolean | IPatchFilterEvent | undefined) => void
    ) => void | Promise<void>
}

export type TRegisterOptions =
    | IRegisterActionBeforeOptions
    | IRegisterActionAfterOptions
    | IRegisterCommitFilterOptions
    | IRegisterPatchFilterOptions
