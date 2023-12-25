import {assertNotNull} from '@subsquid/util-internal'
import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {allFields} from './allFields'

export const processor = new EvmBatchProcessor()
    .setGateway(lookupArchive('binance'))
    .setFinalityConfirmation(5)
    .setFields(allFields)
    .addTrace({
        type: ['call'],
        callTo: ['0x1b81D678ffb9C0263b24A97847620C99d213eB14'], // PancakeSwap v3 router
        transaction: true,
        range: {from: 30_000_000, to: 30_001_000}
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
