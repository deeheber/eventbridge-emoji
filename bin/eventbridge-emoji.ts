#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { EventbridgeEmojiStack } from '../lib/eventbridge-emoji-stack'

const app = new cdk.App()
new EventbridgeEmojiStack(app, 'EventbridgeEmojiStack', {
  description: 'Eventbridge Emoji Stack',
})
