import { Duration, Stack, StackProps } from 'aws-cdk-lib'
import { EventBus, IEventBus, Rule } from 'aws-cdk-lib/aws-events'
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets'
import { Construct } from 'constructs'

export class EventbridgeEmojiStack extends Stack {
  private id: string
  private eventBus: IEventBus

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.id = id

    this.importEventBus()
    this.createRuleAndTarget()
  }

  private importEventBus() {
    this.eventBus = EventBus.fromEventBusName(
      this,
      `${this.id}-default-bus`,
      'default',
    )
  }

  private createRuleAndTarget() {
    const rule = new Rule(this, `${this.id}-rule`, {
      eventBus: this.eventBus,
      eventPattern: {
        detailType: ['💩'],
        source: ['🐶'],
      },
    })

    const lambdaId = `${this.id}-lambda`
    const targetLambda = new NodejsFunction(this, lambdaId, {
      architecture: Architecture.ARM_64,
      entry: 'src/target.ts',
      functionName: lambdaId,
      handler: 'handler',
      logRetention: RetentionDays.ONE_DAY,
      runtime: Runtime.NODEJS_18_X,
      timeout: Duration.minutes(15),
    })

    rule.addTarget(
      new LambdaFunction(targetLambda, {
        maxEventAge: Duration.minutes(5),
        retryAttempts: 2,
      }),
    )
  }
}
