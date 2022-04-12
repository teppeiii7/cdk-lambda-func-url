import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import * as CdkLambdaFuncUrl from '../lib/cdk-lambda-func-url-stack'

test('TestStack', () => {
  const app = new cdk.App()
  const stack = new CdkLambdaFuncUrl.CdkLambdaFuncUrlStack(app, 'MyTestStack')
  const template = Template.fromStack(stack)
  expect(template.toJSON()).toMatchSnapshot()
})
