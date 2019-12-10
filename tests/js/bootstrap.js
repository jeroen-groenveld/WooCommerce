import window from './stubs/window'
import { mocker } from './stubs/mocker'

const chai = require('chai')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

function setupGlobals ()
{
  for (const item in window) {
    global[item] = window[item]
  }
}

setupGlobals()

export const sinon = require('sinon')
export const faker = require('faker')
export const expect = chai.expect
export const assert = chai.assert
export const mock = mocker
