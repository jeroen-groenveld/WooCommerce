const faker = require('faker')

function aClass (ClassName, sinon)
{
  const methods = objectMethods(ClassName)
  const stub = buildStubMethods(methods, sinon)

  return generateProxyForMock(stub, sinon)
}

function translations ()
{
  return {
    doNotCloseBrowserTabMessage: faker.random.uuid(),
    scheduleInfoErrorMessage: faker.random.uuid(),
    preventFormSubmissionMessage: faker.random.uuid(),
  }
}

function jQuery (sinon)
{
  const methods = [
    'on',
    'trigger',
    'removeClass',
    'addClass'
  ]

  const stub = buildStubMethods(methods, sinon)

  return generateProxyForMock(stub, sinon)
}

function theElement (sinon)
{
  const methods = [
    'insertAdjacentHTML',
    'querySelector',
    'addEventListener',
    'removeEventListener',
  ]

  const stub = buildStubMethods(methods, sinon)

  return generateProxyForMock(stub, sinon)
}

function theEvent (sinon)
{
  const methods = [
    'preventDefault',
    'stopImmediatePropagation',
  ]
  const stub = buildStubMethods(methods, sinon)

  stub.target = faker.random.uuid()
  stub.currentTarget = faker.random.uuid()

  return generateProxyForMock(stub, sinon)
}

function objectMethods (ClassName)
{
  const prototype = ClassName.prototype

  const methods = Object
    .getOwnPropertyNames(prototype)
    .filter(method => typeof prototype[method] === 'function')
    .filter(method => method !== 'constructor')

  return methods
}

function buildStubMethods (methods, sinon)
{
  const stub = sinon.stub()

  methods.forEach(method => stub[method] = () => {})

  return stub
}

function generateProxyForMock (stub, sinon)
{
  return new Proxy(
    sinon.mock(stub),
    {
      get (object, property)
      {
        if (typeof object.object[property] !== 'undefined') {
          return object.object[property]
        }

        if (typeof object[property] !== 'undefined') {
          return Reflect.get(...arguments)
        }

        return null
      },
    },
  )
}

export const mocker = {
  aClass,
  translations,
  jQuery,
  theElement,
  theEvent,
  generateProxyForMock,
}
