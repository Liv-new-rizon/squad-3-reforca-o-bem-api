/**
 * Decorator para injetar automaticamente uma instância de repositório em uma propriedade de classe.
 *
 * Este decorator cria uma instância do repositório fornecido e a associa à propriedade decorada.
 *
 * @example
 * ```typescript
 * @InjectRepository(UserRepository)
 * private userRepository!: UserRepository;
 * ```
 *
 * @template T - O tipo do repositório que será injetado.
 * @param RepositoryClass - A classe do repositório que será instanciada.
 * @returns {Function} Um decorator que associa a instância do repositório à propriedade da classe.
 */
export function InjectRepository<T>(RepositoryClass: { new (): T }) {
    return function (target: any, propertyKey: string) {
        const instance = new RepositoryClass();
        Reflect.defineProperty(target, propertyKey, {
            value: instance,
            writable: false
        });
    };
}
