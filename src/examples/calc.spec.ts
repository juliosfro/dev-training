export function add(x: number, y: number) {
    return x + y;
}

/**
 * O primeiro parametro eh uma descricao doque eu quero testar.
 * O segundo parametro eh uma funcao, essa funcao pode ser anonima.
 * O describe eh uma funcao que pode ser criada para agrupar varios testes.
 * No lugar de test podemos usar o it.
 */
describe('Initial test', () => {

    test('add function', () => {
        /**
         * Eu espero que ao chamar a funcao add seja retornado o valor 4.
         */
        expect(add(1, 2)).toEqual(3);
    });
});