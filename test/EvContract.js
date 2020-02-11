/* eslint-disable no-undef */
const EvContract = artifacts.require('./EvContract.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('EvContract', ([deployer, owner]) => {
  let evContract

  before(async() => {
      evContract = await EvContract.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
        const address = await evContract.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        })
    it('has a dappName', async () => {
        const dappName = await evContract.dappName()
        assert.equal(dappName, 'Electricity Trading for EV car')
    })
  })

  describe('car', async () => {
      let result, cnt
      
      it('car set', async () => {
          result = await evContract.setCar('95h1213','yeji', 100, 50, {from: owner})
          cnt = await evContract.cnt()
          assert.equal(cnt,1)
          const event = result.logs[0].args
          console.log(event)
      })
  })
})