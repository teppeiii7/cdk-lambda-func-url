import { CfnOutput, CfnResource, Duration, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'

export class CdkLambdaFuncUrlStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const lambda = new NodejsFunction(this, 'FuncUrlApi', {
      runtime: Runtime.NODEJS_14_X,
      functionName: 'FuncUrlApi',
      entry: 'src/index.ts',
      memorySize: 256,
      architecture: Architecture.ARM_64,
      timeout: Duration.seconds(10),
      logRetention: RetentionDays.ONE_DAY
    })

    // Function UrlsのCFn
    const cfnFuncUrl = new CfnResource(this, 'funcUrlCfn', {
      type: 'AWS::Lambda::Url',
      properties: {
        TargetFunctionArn: lambda.functionArn,
        AuthType: 'NONE',
        Cors: { AllowOrigins: ['*'] }
      }
    })

    // 実行権限のlambda:InvokeFunctionUrl がないとエラーがでる
    // https://dev.classmethod.jp/articles/aws-lambda-function-urls-built-in-https-endpoints/
    // https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html#urls-governance
    const funcUrlPermissionCfn = new CfnResource(this, 'funcUrlPermissionCfn', {
      type: 'AWS::Lambda::Permission',
      properties: {
        FunctionName: lambda.functionName,
        Principal: '*',
        Action: 'lambda:InvokeFunctionUrl',
        FunctionUrlAuthType: 'NONE'
      }
    })

    new CfnOutput(this, 'funcUrl', {
      value: `${cfnFuncUrl.getAtt('FunctionUrl')}`
    })
  }
}
