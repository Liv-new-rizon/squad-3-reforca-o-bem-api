import 'reflect-metadata';

/**
 * Decorator para injetar dinamicamente uma instância de repositório.
 * Utiliza reflect-metadata para gerenciamento global.
 *
 * @param RepositoryClass - A classe do repositório que será instanciada.
 * @returns {Function} Um decorator que associa a instância do repositório à propriedade da classe.
 */
export function InjectRepository<T>(RepositoryClass: new () => T) {
    return function (target: object, propertyKey: string | symbol) {
        const instance = new RepositoryClass();

        // Define metadata para armazenar a instância
        Reflect.defineMetadata(propertyKey, instance, target);

        // Cria um getter dinâmico para a propriedade decorada
        Object.defineProperty(target, propertyKey, {
            get: () => Reflect.getMetadata(propertyKey, target),
            enumerable: true,
            configurable: false
        });
    };
}
